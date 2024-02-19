import { Detail, Form, ActionPanel, Action, Icon } from "@raycast/api";
import { prettifyDate } from "./util";

// View block detail
export const createBlockMarkdown = (image: any) => {
  return `![Illustration](${image})`;
};

// created_at
// description: '',
// comment_count

export function DetailView({name, image, moreInfo }: any) {
  return (
    <Detail
      markdown={createBlockMarkdown(image)}
      metadata={
        <Detail.Metadata>
          <Detail.Metadata.Link title="Name" target={moreInfo.source} text={name} />
          <Detail.Metadata.Label title="Description" text={moreInfo.description} />
          <Detail.Metadata.Label title="Created At" text={prettifyDate(moreInfo.createdAt)} />
          <Detail.Metadata.Separator />
          <Detail.Metadata.TagList title="Statistics">
            <Detail.Metadata.TagList.Item text={`💬 Comment count`} color={name} />
          </Detail.Metadata.TagList>
        </Detail.Metadata>
      }
    />
  );
}

// Create block

function createBlockInChannel(arena: any, channel: any, values: any) {
  const obj = {
    source: channel,
    content: values.submittedURL,
  };

  arena.block().create(channel, obj)
}

export function UploadView({arena, channel, pop, addBlock, setAddBlock}: any) {

  return (
    <Form
      navigationTitle="Upload"
      isLoading={false}
      actions={
        <ActionPanel>
          <Action.SubmitForm
            title="Submit"
            onSubmit={(values: any) => {
              createBlockInChannel(arena, channel, values),
              pop()
              
            }}
            icon={Icon.Upload}
          />
        </ActionPanel>
      }
    >
      <Form.TextField
        id="submittedURL"
        title="URL"
        placeholder="Add your URL here"
        autoFocus
        info="If selected only one file and no album title, image will uploaded without a album."
        value=""
      />
    </Form>
  );
}

import { Detail, Form, ActionPanel, Action, Icon } from "@raycast/api";

export const createBlockMarkdown = (image: any) => {
  return `![Illustration](${image})`;
};

function createBlockInChannel(arena: any, channel: any, values: any) {
  //console.log("hello", channel.toChannel, values.submittedURL);
  //are.na API is deprecated actually need obj : {source: x, content: y} as values
  const obj = {
    source: channel.toChannel,
    content: values.submittedURL,
  };
  arena.block().create(channel.toChannel, obj);
}

export function DetailView(name: any, image: any) {
  return (
    <Detail
      markdown={createBlockMarkdown(image)}
      metadata={
        <Detail.Metadata>
          <Detail.Metadata.Link title="Author" target={name} text={name} />
          <Detail.Metadata.Separator />
          <Detail.Metadata.TagList title="Statistics">
            <Detail.Metadata.TagList.Item text={`❤️ ${name}`} color={name} />
            <Detail.Metadata.TagList.Item text={`👁 ${name}`} color={name} />
          </Detail.Metadata.TagList>
        </Detail.Metadata>
      }
    />
  );
}

export function UploadView(arena: any, channel: any) {
  return (
    <Form
      navigationTitle="Upload"
      enableDrafts
      isLoading={false}
      actions={
        <ActionPanel>
          <Action.SubmitForm
            title="Submit"
            onSubmit={(values: any) => createBlockInChannel(arena, channel, values)}
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
        value="false"
      />
    </Form>
  );
}

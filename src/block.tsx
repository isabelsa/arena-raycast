import { Form, ActionPanel, Action, Icon } from "@raycast/api";


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

import { Icon, Form, ActionPanel, Action } from "@raycast/api";
import fs from "fs";

export default function UploadImagesToArena() {
  return (
    <Form
      navigationTitle="Upload"
      enableDrafts
      isLoading={false}
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Submit" onSubmit={null} icon={Icon.Upload} />
        </ActionPanel>
      }
    >
      <Form.TextField
        id="albumName"
        title="Channel"
        placeholder="Choose channeç"
        autoFocus
        info="If selected only one file and no album title, image will uploaded without a album."
        value="false"
        onChange={false}
      />
      <Form.FilePicker
        id="media"
        title="Media"
        info="Select an image or video to upload"
        allowMultipleSelection={true}
        value={false}
        onChange={false}
        canChooseDirectories={false}
      />
    </Form>
  );
}

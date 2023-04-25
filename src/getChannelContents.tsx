import { useEffect, useState } from "react";
import { Form, ActionPanel, Action, Grid, Detail, Icon, getPreferenceValues } from "@raycast/api";
import {getIcon} from "./util"

const preferences = getPreferenceValues();
const Arena = require("are.na");
const arena = new Arena({ accessToken: preferences.token });

const generateSVG = (text: string) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M14.5895 16.0032L5.98291 7.39664L7.39712 5.98242L16.0037 14.589V7.00324H18.0037V18.0032H7.00373V16.0032H14.5895Z"></path></svg>
  )
}

const createBlockMarkdown = (title: any, image: any) => {
  return `![Illustration](${image})`;
};

type Block = {
  id: string;
  name: string;
  title: string;
  generated_title: string;
  content: string;
  source?: {
    title: string;
  };
  image: {
    square?: {
      url?: string;
    };
  };
};

// Fix: Not getting private and closed posts
export function getChannelContents(arena: any, channel: any, set: any) {
  arena
    .channel(channel)
    .contents()
    .then((blocks: Block[]) => {
      blocks.map((x: Block) => {
        console.log("Block ->", x);

        const block = {
          id: x.id,
          name: x.title ,
          title: x.source?.title || x.content || x.generated_title,
          image: x.image?.square?.url,
          content: x.content
        };
        set((prev: any) => [...prev, block]);
      });
    })
    .catch((err: any) => console.log(err));
}

function createBlockInChannel(channel: any, values: any) {
  //console.log("hello", channel.toChannel, values.submittedURL);

  //are.na API is deprecated actually need obj : {source: x, content: y} as values
  const obj = {
    source: channel.toChannel,
    content: values.submittedURL
  }
  arena.block().create(channel.toChannel, obj);
}

function UploadView(channel: any) {
  return (
    <Form
      navigationTitle="Upload"
      enableDrafts
      isLoading={false}
      actions={
        <ActionPanel>
          <Action.SubmitForm
            title="Submit"
            onSubmit={(values: any) => createBlockInChannel(channel, values)}
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

export default function GetChannelContents() {
  const [channel] = useState("hey-dev-test");
  const [items, setItems] = useState<string[]>([]);
  const [isLoading] = useState(true);

  useEffect(() => {
    getChannelContents(arena, channel, setItems);
  }, []);

  return (
    <Grid columns={3} fit={Grid.Fit.Fill} isLoading={isLoading}>
      <Grid.Item
        content={{value: { source: Icon.PlusCircle}, tooltip: "Add block"}}
        title="Add block"
        subtitle="URL, Text"
        actions={
          <ActionPanel>
            <Action.Push title="Add block" target={<UploadView toChannel={channel} />} />
          </ActionPanel>
        }
      />
      {items.map(({ id, name, title, image }: any) => (
        <Grid.Item
          key={id}
          content={{ tooltip: title, value: image ?? getIcon(title) }}
          subtitle={name}
          actions={
            <ActionPanel>
              <Action.Push
                title="View Detail"
                target={
                  <Detail
                    markdown={createBlockMarkdown(title, image)}
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
                }
              ></Action.Push>
              <Action.CopyToClipboard content={image} />
              <Action.OpenInBrowser title="Open in Browser" url={image} />
            </ActionPanel>
          }
        />
      ))}
    </Grid>
  );
}

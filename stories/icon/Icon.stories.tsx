import { Text } from "../../components/Text/Text";
import { TextType } from "../../components/Text/text.constant";
import { CATEGORY_DATA } from "../../constants";
import type { Meta } from "@storybook/react";

const meta = {
  title: "Foundation/Icon",
  tags: ["autodocs"],
} satisfies Meta;

export default meta;

export const IconStory = () => {
  return (
    <div className="flex gap-4 flex-wrap">
      {CATEGORY_DATA.map((category, idx) => (
        <div key={idx} className="flex flex-col gap-2 pt-4 w-20">
          <category.Icon className="text-2xl mx-auto" />
          <Text
            label={category.title}
            className="text-center"
            type={TextType.GRAY_DESC}
          />
        </div>
      ))}
    </div>
  );
};

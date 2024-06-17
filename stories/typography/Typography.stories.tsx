import { Text } from "../../components/Text/Text";
import { TextType } from "../../components/Text/text.constant";
import type { Meta } from "@storybook/react";

const meta = {
  title: "Foundation/Typography",
  tags: ["autodocs"],
} satisfies Meta;

export default meta;

export const TypographyList = () => {
  return (
    <div className="flex flex-col gap-4">
      {Object.entries(TextType).map(([key, value]) => (
        <Text
          key={key}
          label="가나다마라바사아자차카타파하 1234567890 ~!@#$%^&*()_+"
          type={value}
        />
      ))}
    </div>
  );
};

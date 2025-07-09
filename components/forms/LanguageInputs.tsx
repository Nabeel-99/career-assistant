import React from "react";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

type LanguageInputsProps = {
  languagesFields: any[];
  form: any;
  removeLanguage: any;
  appendLanguage: any;
};
const LanguageInputs = ({
  languagesFields,
  form,
  removeLanguage,
  appendLanguage,
}: LanguageInputsProps) => {
  return languagesFields.map((field, index) => (
    <div key={field.id} className="grid grid-cols-2 gap-4">
      <FormField
        control={form.control}
        name={`languages.${index}.name`}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input type="text" placeholder="Enter language name" {...field} />
            </FormControl>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`languages.${index}.level`}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select language level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Levels</SelectLabel>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormControl>
          </FormItem>
        )}
      />
      <div className="flex items-center gap-2 justify-start">
        <Button
          className={cn({ hidden: index === 0 })}
          type="button"
          onClick={() => removeLanguage(index)}
        >
          Remove
        </Button>
        <Button
          type="button"
          onClick={() =>
            appendLanguage({
              name: "",
              level: "beginner",
            })
          }
        >
          Add
        </Button>
      </div>
    </div>
  ));
};

export default LanguageInputs;

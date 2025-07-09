import React from "react";
import { Button } from "../ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { cn } from "@/lib/utils";

type AwardsInputsProps = {
  awardsFields: any[];
  form: any;
  removeAward: any;
  appendAward: any;
};
const AwardsInputs = ({
  awardsFields,
  form,
  removeAward,
  appendAward,
}: AwardsInputsProps) => {
  return awardsFields.map((field, index) => (
    <div key={field.id} className="grid  gap-4">
      <FormField
        control={form.control}
        name={`awards.${index}.title`}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input type="text" placeholder="Enter award title" {...field} />
            </FormControl>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`awards.${index}.description`}
        render={({ field }) => (
          <FormItem className="">
            <FormControl>
              <Textarea placeholder="Enter description" {...field} />
            </FormControl>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name={`experience.${index}.startDate`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Year</FormLabel>
            <FormControl>
              <Input type="date" placeholder="" {...field} />
            </FormControl>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />

      <div className="flex items-center gap-2 justify-start">
        <Button
          className={cn({ hidden: index === 0 })}
          type="button"
          onClick={() => removeAward(index)}
        >
          Remove
        </Button>
        <Button
          type="button"
          onClick={() =>
            appendAward({
              title: "",
              description: "",
              startDate: "",
            })
          }
        >
          Add
        </Button>
      </div>
    </div>
  ));
};

export default AwardsInputs;

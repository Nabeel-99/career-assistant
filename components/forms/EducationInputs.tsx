import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

type EducationInputsProps = {
  educationFields: any[];
  form: any;
  removeEducation: any;
  appendEducation: any;
};
const EducationInputs = ({
  educationFields,
  form,
  removeEducation,
  appendEducation,
}: EducationInputsProps) => {
  return educationFields.map((field, index) => (
    <div key={field.id} className="grid grid-cols-2 gap-4">
      <FormField
        control={form.control}
        name={`education.${index}.school`}
        render={({ field }) => (
          <FormItem className="col-span-2">
            <FormControl>
              <Input
                type="text"
                placeholder="Enter your school name"
                {...field}
              />
            </FormControl>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`education.${index}.degree`}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input type="text" placeholder="Enter your degree" {...field} />
            </FormControl>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`education.${index}.location`}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input
                type="text"
                placeholder="Enter school location"
                {...field}
              />
            </FormControl>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`education.${index}.startDate`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Start Date</FormLabel>
            <FormControl>
              <Input
                type="date"
                placeholder="Enter your start date"
                {...field}
              />
            </FormControl>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`education.${index}.endDate`}
        render={({ field }) => (
          <FormItem>
            <FormLabel> End Date</FormLabel>
            <FormControl>
              <Input type="date" placeholder="Enter your end date" {...field} />
            </FormControl>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />
      <div className="flex items-center gap-2 justify-start">
        <Button
          className={cn({ hidden: index === 0 })}
          type="button"
          onClick={() => removeEducation(index)}
        >
          Remove
        </Button>
        <Button
          type="button"
          onClick={() =>
            appendEducation({
              school: "",
              degree: "",
              location: "",
              startDate: "",
              endDate: "",
            })
          }
        >
          Add
        </Button>
      </div>
    </div>
  ));
};

export default EducationInputs;

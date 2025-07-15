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
import { Checkbox } from "../ui/checkbox";

type ExperienceInputsProps = {
  experienceFields: any[];
  form: any;
  removeExperience: any;
  appendExperience: any;
};
const ExperienceInputs = ({
  experienceFields,
  form,
  removeExperience,
  appendExperience,
}: ExperienceInputsProps) => {
  return experienceFields.map((field, index) => (
    <div key={field.id} className="grid grid-cols-2 gap-4">
      <FormField
        control={form.control}
        name={`experience.${index}.company`}
        render={({ field }) => (
          <FormItem className="">
            <FormControl>
              <Input type="text" placeholder="Enter company name" {...field} />
            </FormControl>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`experience.${index}.title`}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input
                type="text"
                placeholder="Enter title e.g Software Engineer"
                {...field}
              />
            </FormControl>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`experience.${index}.description`}
        render={({ field }) => (
          <FormItem className="col-span-2">
            <FormControl>
              <Textarea placeholder="Enter description" {...field} />
            </FormControl>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`experience.${index}.location`}
        render={({ field }) => (
          <FormItem className="col-span-2">
            <FormControl>
              <Input
                type="text"
                placeholder="Enter company location"
                {...field}
              />
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
        name={`experience.${index}.endDate`}
        render={({ field }) => {
          const isWorking = form.watch(`experience.${index}.currentlyWorking`);
          return (
            <FormItem>
              <FormLabel>End Date</FormLabel>
              <FormControl>
                <Input
                  type={isWorking ? "text" : "date"}
                  placeholder="Enter your end date"
                  disabled={isWorking}
                  value={isWorking ? "Present" : field.value}
                  onChange={(e) => {
                    if (!isWorking) {
                      field.onChange(e.target.value);
                    }
                  }}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          );
        }}
      />
      <FormField
        control={form.control}
        name={`experience.${index}.currentlyWorking`}
        render={({ field }) => (
          <FormItem className="flex items-center  col-span-2  gap-2 mt-2">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={(checked) => {
                  field.onChange(checked);
                  if (checked) {
                    form.setValue(`experience.${index}.endDate`, "Present");
                  } else {
                    form.setValue(`experience.${index}.endDate`, "");
                  }
                }}
              />
            </FormControl>
            <FormLabel className="text-sm font-normal">
              I currently work here
            </FormLabel>
          </FormItem>
        )}
      />

      <div className="flex items-center gap-2 justify-start">
        <Button
          className={cn({ hidden: index === 0 })}
          type="button"
          onClick={() => removeExperience(index)}
        >
          Remove
        </Button>
        <Button
          type="button"
          onClick={() =>
            appendExperience({
              company: "",
              title: "",
              location: "",
              startDate: "",
              endDate: "",
              description: "",
            })
          }
        >
          Add
        </Button>
      </div>
    </div>
  ));
};

export default ExperienceInputs;

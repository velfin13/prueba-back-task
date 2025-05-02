import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Grid,
  InputBaseComponentProps,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField
} from "@mui/material";
import React, { useEffect } from "react";
import {
  DefaultValues,
  FieldValues,
  Path,
  PathValue,
  Resolver,
  useForm,
} from "react-hook-form";
import * as yup from "yup";

export interface IImputSelect {
  value: string;
  label: string;
}

export interface FormField<T extends FieldValues> {
  name: Path<T>;
  label: string;
  xs?: number;
  md?: number;
  tooltip?: string;
  minRows?: number;
  maxRows?: number;
  required?: boolean;
  disabled?: boolean;
  defaultValue?: PathValue<T, Path<T>>;
  value?: string;
  inputProps?: InputBaseComponentProps;
  validationSchema?: yup.AnySchema;
  type: "text" | "password" | "email" | "number" | "date" | "datetime" | "hidden" | "select" | "textarea";
  options?: IImputSelect[];
  toUppercase?: boolean;
  onChange?: (event: React.ChangeEvent<any> | SelectChangeEvent<string>) => void;
}

export interface DynamicFormProps<T extends FieldValues> {
  labelButon?: string;
  fields: FormField<T>[];
  children?: React.ReactNode;
  onSubmit: (data: T) => void;
  resetForm: boolean;
  setResetForm: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DynamicForm = <T extends FieldValues>({
  fields,
  onSubmit,
  resetForm,
  labelButon,
  children,
  setResetForm,
}: DynamicFormProps<T>) => {
  const schemaShape = fields.reduce<Record<string, yup.AnySchema>>((acc, field) => {
    if (field.validationSchema) {
      acc[field.name as string] = field.validationSchema;
    }
    return acc;
  }, {});

  const schema = yup.object(schemaShape) as yup.AnyObjectSchema;
  const resolver = yupResolver(schema) as unknown as Resolver<T>;

  const defaultValues = fields.reduce<DefaultValues<T>>((acc, field) => {
    acc[field.name] = field.defaultValue as PathValue<T, Path<T>>;
    return acc;
  }, {} as DefaultValues<T>);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<T>({
    resolver,
    defaultValues,
  });

  useEffect(() => {
    if (resetForm) {
      reset(defaultValues);
      setResetForm(false);
    }
  }, [resetForm, reset, setResetForm, defaultValues]);

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={4}>
        {fields.map((field) => {
          const errorMessage = errors[field.name]?.message as string | undefined;

          return (
            <Grid
              size={{ xs: field.xs ?? 12, md: field.md ?? 12 }}
              key={String(field.name)}
            >
              {field.type === "select" ? (
                <>
                  <InputLabel id={field.label}>{field.label}</InputLabel>
                  <Select
                    labelId={field.label}
                    required={field.required}
                    defaultValue={field.defaultValue}
                    inputProps={field.inputProps}
                    disabled={field.disabled}
                    fullWidth
                    size="small"
                    {...register(field.name)}
                    error={!!errors[field.name]}
                    onChange={(e) => {
                      setValue(field.name, e.target.value as PathValue<T, Path<T>>);
                      field.onChange?.(e);
                    }}
                  >
                    {field.options?.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </>
              ) : field.type === "textarea" ? (
                <TextField
                  multiline
                  minRows={field.minRows ?? 3}
                  maxRows={field.maxRows}
                  fullWidth
                  required={field.required}
                  disabled={field.disabled}
                  defaultValue={field.defaultValue}
                  label={field.label}
                  size="small"
                  error={!!errors[field.name]}
                  helperText={errorMessage}
                  {...register(field.name)}
                  inputProps={{
                    ...field.inputProps,
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                      if (field.toUppercase) {
                        e.target.value = e.target.value.toUpperCase();
                      }
                      setValue(field.name, e.target.value as PathValue<T, Path<T>>);
                      field.onChange?.(e);
                    },
                  }}
                />

              ) : field.type === "hidden" ? (
                <input
                  type="hidden"
                  defaultValue={field.defaultValue as string}
                  {...register(field.name)}
                />
              ) : (
                <TextField
                  size="small"
                  fullWidth
                  required={field.required}
                  disabled={field.disabled}
                  defaultValue={field.defaultValue}
                  type={field.type === "datetime" ? "datetime-local" : field.type}
                  inputProps={{
                    ...field.inputProps,
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                      if (field.toUppercase) {
                        e.target.value = e.target.value.toUpperCase();
                      }
                      setValue(field.name, e.target.value as PathValue<T, Path<T>>);
                      field.onChange?.(e);
                    },
                  }}
                  InputLabelProps={{
                    shrink: ["date", "datetime"].includes(field.type) ? true : undefined,
                  }}
                  label={field.label}
                  {...register(field.name)}
                  error={!!errors[field.name]}
                  helperText={errorMessage}
                />
              )}
            </Grid>
          );
        })}

        {children && (
          <Grid size={{ xs: 12, md: 12 }}>
            {children}
          </Grid>
        )}

        <Grid size={{ xs: 12 }} style={{ marginBottom: 15 }}>
          <Button fullWidth variant="contained" color="primary" type="submit">
            {labelButon ?? "Crear"}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
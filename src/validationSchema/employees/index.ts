import * as yup from 'yup';

export const employeeValidationSchema = yup.object().shape({
  time_tracking: yup.boolean(),
  performance_evaluation: yup.boolean(),
  user_id: yup.string().nullable(),
  organization_id: yup.string().nullable(),
});

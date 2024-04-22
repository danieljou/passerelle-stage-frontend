/** @format */

import { useFormik } from "formik";
export type useFormikType = ReturnType<typeof useFormik>;
export const addErrorClasses = (
	formMik: ReturnType<typeof useFormik<any>>,
	field: string
): string | undefined => {
	if (formMik.touched[field] && formMik.errors[field]) {
		return "border-red-400 focus:border-red-400";
	}
};
export const addErrorMessage = (
	formMik: ReturnType<typeof useFormik<any>>,
	field: string
): React.ReactNode | null => {
	if (formMik.touched[field] && formMik.errors[field]) {
		const error = formMik.errors[field];

		// Check if the error is a string
		if (typeof error === "string") {
			return <div className="text-red-500 text-xs">{error}</div>;
		}

		// Check if the error is an array of strings
		if (Array.isArray(error) && typeof error[0] === "string") {
			return <div className="text-red-500 text-xs">{error[0]}</div>;
		}

		// Check if the error is of type FormikErrors<any>
		if (typeof error === "object") {
			// Handle the FormikErrors object, or return null if not applicable
			// For example:
			// return <div className="text-red-500 text-xs">{JSON.stringify(error)}</div>;
			return null;
		}

		// Handle other cases if necessary
	}

	return null;
};

export const formStyles = () => {
	return "w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg";
};

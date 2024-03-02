import { createSlice } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";  Payload kullanacak olursan docs git.
import type { RootState } from "@/app/store";

// Define a type for the slice state
interface LanguageState {
	value: String;
}

// Define the initial state using that type
const initialState: LanguageState = {
	value: "tr",
};

export const languageSlice = createSlice({
	name: "language",
	// `createSlice` will infer the state type from the `initialState` argument
	initialState,
	reducers: {
		setLanguageToTurkish: (state) => {
			state.value = "tr";
		},
		setLanguageToEnglish: (state) => {
			state.value = "en";
		},
		setLanguageToGerman: (state) => {
			state.value = "de";
		},
	},
});

export const {
	setLanguageToTurkish,
	setLanguageToEnglish,
	setLanguageToGerman,
} = languageSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.language.value;

export default languageSlice.reducer;

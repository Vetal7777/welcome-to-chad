import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import initialState from "../../state/initialState";
import {ProgressStepI} from "../../models/progress-step";

export const appSlice = createSlice({
    name: 'App',
    initialState,
    reducers: {
        toggleErrorStatus(state){
            state.error = !state.error;
        },
        toggleMessageStatus(state){
            state.message = !state.message;
        },
        toggleIsLoading(state){
            state.isLoading = !state.isLoading;
        },
        setProgressSteps(state,action:PayloadAction<ProgressStepI>){
            state.progress_steps = [...state.progress_steps].map(step => step.title === action.payload.title ? action.payload : step);
            state.error = false;
            state.message = false;
        },
        setGoogleToken(state,action:PayloadAction<string | null>){
            state.google_token = action.payload;
        },
        setShopName(state,action:PayloadAction<string | null>){
            state.shop_name = action.payload;
        },
        setShopToken(state,action:PayloadAction<string | null>){
            state.shop_token = action.payload;
        },
        setName(state,action:PayloadAction<string | null>){
            state.name = action.payload;
        },
        setPassword(state,action:PayloadAction<string | null>){
            state.password = action.payload;
        },
        setEmail(state,action:PayloadAction<string | null>){
            state.email = action.payload;
        },
        changeStep(state,actions:PayloadAction<[number,number]>){
            const [currenStepIndex,selectedStepIndex] = actions.payload;
            state.progress_steps = [...state.progress_steps]
                .map((step,index) => {
                    switch (true){
                        case currenStepIndex === index:
                            return {...step,active: false}
                        break;
                        case selectedStepIndex === index:
                            return {...step,active: true}
                        break;
                        default:
                            return step;
                    }
                })
        }
    }
})

export default appSlice.reducer;
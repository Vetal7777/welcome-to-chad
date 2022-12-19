import {ProgressStepI} from "./progress-step";

export interface InitialState{
    email: string | null,
    name: string | null,
    password: string | null,
    progress_steps: ProgressStepI[],
    google_token: null | string,
    shop_token: null | string,
    isLoading: boolean,
    shop_name: string | null,
    error: boolean,
    message: boolean
}
import {InitialState} from "../models/initialState";
import ProgressSteps from "../shared/consts/progress-steps";

const initialState:InitialState = {
    shop_name: null,
    email: null,
    name: null,
    password: null,
    progress_steps: ProgressSteps,
    google_token: null,
    shop_token: null,
    isLoading: false,
    error: false,
    message: false
}

export default initialState;
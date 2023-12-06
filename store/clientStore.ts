import LoginCredential from "./reducers/LoginAuth";
import Signup from "./reducers/Signup";
import ToggleTheme from "./reducers/ToggleTheme";
import MovieManager from "./reducers/movieReducer"
import TimeslotReducer from "./reducers/TimeslotReducer"
import TicketManager from "./reducers/TicketReducer";

export const clientStore = {
    LoginCredential: LoginCredential,
    Signup: Signup,
    ToggleTheme: ToggleTheme,
    MovieManager: MovieManager,
    TimeslotReducer: TimeslotReducer,
    TicketManager: TicketManager
}
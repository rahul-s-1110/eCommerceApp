import react from "react";
import { NavigationContainer } from "@react-navigation/native";
import MainNavigation from "./mainNavigation";
import AuthNavigation from "./authNavigation";

const NavigationScreen = () =>{
    const auth = false;
    return(
        <>
            <NavigationContainer>
                {auth?<MainNavigation />:<AuthNavigation />}
            </NavigationContainer>
        </>
    )
}
export default NavigationScreen
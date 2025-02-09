import {Text, View} from "react-native";
import { Dialog } from "react-native-elements";

interface AlertProps {
    visible: boolean;
    title: string;
    message: string;
    onClose: () => void;
    onClick: () => void;
    type: string; // Add this line
}
const Alert = (props: AlertProps) => {
    if (!props.visible) {
        return null;
    }
    return (
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            {props.type == "alert" ?
                <Dialog isVisible={props.visible} onBackdropPress={props.onClose}>
                    <Dialog.Title title={props.title} />
                    <Text>{props.message}</Text>
                    <Dialog.Button title="okay" onPress={props.onClose} />
                </Dialog>
            : 
            <Dialog isVisible={props.visible}
            onBackdropPress={props.onClose}>
                <Dialog.Title title={props.title} />
                <Text>{props.message}</Text>
                <Dialog.Actions>
                    <Dialog.Button title="yes" onPress={props.onClick} />
                    <Dialog.Button title="no" onPress={props.onClose} />
                </Dialog.Actions>
                </Dialog>
            }
        </View>
    );
};

export default Alert;
import { ActivityIndicator, Text, View } from "react-native";

interface LoaderProps {
    loading: boolean;
    title?: string;
}

const Loader = (props: LoaderProps) => {
    if (!props.loading) {
        return null;
    }
    return(
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="large" color="#0000ff" />
            {props.title && <Text>{props.title}</Text>}
        </View>
    )
}

export default Loader;
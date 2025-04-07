import { Camera, CameraView } from "expo-camera";
import { Stack } from "expo-router";
import {
    View,
    Text,
    Platform,
    SafeAreaView,
    StatusBar,
    StyleSheet,
} from "react-native";
import { Overlay } from "./Overlay";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

export default function Home() {
    const [scanData, setscanData] = useState("");
    const [debouncedData] = useDebounce(scanData, 500);

    useEffect(() => {
        if (scanData) {
            fetch("https://ba98-138-51-77-122.ngrok-free.app/reports/" + scanData, { method: "POST" });
            console.log("Read Barcode: " + scanData);
        }

    }, [debouncedData])

    return (
        <SafeAreaView style={StyleSheet.absoluteFillObject}>
            <Stack.Screen
                options={{
                    title: "Overview",
                    headerShown: false,
                }}
            />
            {Platform.OS === "android" ? <StatusBar hidden /> : null}
            <CameraView
                style={StyleSheet.absoluteFillObject}
                facing="back"
                onBarcodeScanned={({ data }) => { if (data) setscanData(data); }}
            />
            <Text style={{ fontSize: 20, color: 'red' }}>
                Last Scanned: {debouncedData}
            </Text>

        </SafeAreaView>
    );
}
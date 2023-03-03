import { Alert, Linking } from "react-native";

// @ts-expect-error - `@env` is a virtualised module via Babel config.
import { ENV_PROJECT_ID } from "react-native-dotenv";

function formatNativeUrl(appUrl: string, wcUri: string): string {
	let safeAppUrl = appUrl;
	if (!safeAppUrl.includes("://")) {
		safeAppUrl = appUrl.replaceAll("/", "").replaceAll(":", "");
		safeAppUrl = `${safeAppUrl}://`;
	}
	const encodedWcUrl = encodeURIComponent(wcUri);
	return `${safeAppUrl}wc?uri=${encodedWcUrl}`;
}

function formatUniversalUrl(appUrl: string, wcUri: string): string {
	let plainAppUrl = appUrl;
	if (appUrl.endsWith("/")) {
		plainAppUrl = appUrl.slice(0, -1);
	}
	const encodedWcUrl = encodeURIComponent(wcUri);

	return `${plainAppUrl}/wc?uri=${encodedWcUrl}`;
}

export const navigateDeepLink = async (
	universalLink: string,
	deepLink: string,
	wcURI: string
) => {
	let tempDeepLink;

	if (universalLink && universalLink !== "") {
		tempDeepLink = formatUniversalUrl(universalLink, wcURI);
	} else {
		tempDeepLink = formatNativeUrl(deepLink, wcURI);
	}

	try {
		// Note: Could not use .canOpenURL() to check if the app is installed
		// Due to having to add it to the iOS info
		await Linking.openURL(tempDeepLink);
	} catch (error) {
		Alert.alert(`Unable to open this DeepLink: ${tempDeepLink}`);
	}
};

export const fetchInitialWallets = () => {
	return fetch(
		`https://explorer-api.walletconnect.com/v3/wallets?projectId=${ENV_PROJECT_ID}&entries=7&page=1`
	)
		.then((res) => res.json())
		.then(
			(wallet) => {
				const result = Object.keys(wallet?.listings).map(
					(key) => wallet?.listings[key]
				);
				// result.push({
				// 	key: "1ae92b26df02f0abca6304df07debccd18262fdf5fe82daa81593582dac9a369",
				// });
				console.log("result", result);
				return result;
			},
			(error) => {
				console.log("error", error);
			}
		);
};

export const fetchViewAllWallets = () => {
	return fetch(
		`https://explorer-api.walletconnect.com/v3/wallets?projectId=${ENV_PROJECT_ID}`
	)
		.then((res) => res.json())
		.then(
			(wallet) => {
				const result = Object.keys(wallet?.listings).map(
					(key) => wallet?.listings[key]
				);
				return result;
			},
			(error) => {
				console.log("error", error);
			}
		);
};

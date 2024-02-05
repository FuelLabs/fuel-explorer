import { Route } from "react-router-dom";
import { Pages } from "~/types";

import { Bridge, BridgeHome, BridgeTxList } from "./pages";

export const bridgeRoutes = (
	<>
		<Route
			path={Pages.bridge}
			element={
				<BridgeHome>
					<Bridge />
				</BridgeHome>
			}
		/>
		<Route
			path={Pages.transactions}
			element={
				<BridgeHome>
					<BridgeTxList />
				</BridgeHome>
			}
		/>
	</>
);

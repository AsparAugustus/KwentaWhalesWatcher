export interface User {
    id: string;
    name: string;
    email: string;
  }
  
export interface FuturesTrade {
    id: string;
    timestamp: string;
    account: string;
    abstractAccount: string;
    positionSize: string;
    pnl: string;
    margin: string;
    asset: string;
    trackingCode: string;
    accountType: string;
    marketKey: string;
    orderType: string;
    size: string;
    price: string;
    positionClosed: boolean;
  }
  
export interface FuturesTradesData {
    data: {
        data: {
            futuresTrades: FuturesTrade[];
        }
    };
}
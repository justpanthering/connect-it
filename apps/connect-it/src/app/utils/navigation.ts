export enum ROUTES {
  HOME = '/home',
}

type RootStackParamList = {
  [ROUTES.HOME]: undefined;
};

export enum SERVER_ROUTES {
  CONNECT = '/server/connect',
}

type ServerStackParamList = {
  [SERVER_ROUTES.CONNECT]: undefined;
};

export type StackParamList = RootStackParamList & ServerStackParamList;

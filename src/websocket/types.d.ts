type AvailableMesTypes = 'reg';

interface ResRegData {
  name: string;
  index: number;
  error: boolean;
  errorText: string;
}

interface ReqRegData {
  name: string;
  password: string;
}

interface ResponseObj {
  type: AvailableMesTypes;
  data: Object | ResRegData;
  id: 0;
}

interface RequestObj {
  type: AvailableMesTypes;
  data: Object | ReqRegData;
  id: 0;
}

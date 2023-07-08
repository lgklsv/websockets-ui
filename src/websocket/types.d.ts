type AvailableMesTypes = 'reg';

interface ResReqBase {
  type: AvailableMesTypes;
  data: string;
  id: 0;
}

interface ResponseReg {
  name: string;
  index: number;
  error: boolean;
  errorText: string;
}

interface RequestReg {
  name: string;
  password: string;
}

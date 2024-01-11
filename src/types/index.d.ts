// These are the data types coming in the request body

interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  role: string;
  joinedOn: string;
}

interface UserCredentials {
  email: string;
  password: string;
}

interface Device {
  roomNumber: string;
  deviceName: string;
  ipAddress: string;
  addedBy: string;
}

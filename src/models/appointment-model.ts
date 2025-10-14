export interface AppointmentModel {
    customerName: string;
    contactNumber: string;
    serviceType: string;
    appointmentDate: string;
    appointmentTime: string;
    note: string;
    stylistId: number;
    createdBy: number;
}

export interface AppointmnetResponse {
    Message: string;
    Data: string;
}
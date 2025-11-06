
export type LoginTypeFormData = {
    username: string,
    password: string
}

export type RegisterTypeFormData = {
    fullname: string,
    username: string,
    password: string,
    confirmPassword: string,
    securityKey: string
}

export type ForgetTypeFormData = {
    username: string,
    password: string,
    confirmPassword: string,
    securityKey: string
}

export type ClassTypeFormData = {
    id: string | null
    name: string,
    subject: string,
    timeTable: string,
    totalClass: Number,
    roomNo: string
}

export type StudentTypeFormData = {
    tca: string,
    name: string,
    totalAttendance: Number,
    classId: string
}


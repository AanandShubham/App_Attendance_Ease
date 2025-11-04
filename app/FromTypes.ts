
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
    className: string,
    subject: string,
    time: string,
    totalClass: string,
    roomNo: string
}

export type StudentTypeFormData = {
    tcaNumber: string,
    name: string,
    totalAttendance:string
}


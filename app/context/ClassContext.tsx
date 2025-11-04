import React, { useContext, useState } from "react"

// type SelectedClass = {
//     selectedClassId: string,
//     selectedClassName: string
// }

type ClassContextType = {
    classes: any,
    setClasses: (classes: any) => void,
    students: any,
    setStudents: (students: any) => void,
    selectedClass: any,
    setSelectedClass: (selectedClasse: any) => void,
    attendanceList: any,
    setAttendanceList: (attendanceList: any) => void
}

export const ClassContext = React.createContext<ClassContextType>({
    classes: [],
    setClasses: (classes: any) => {},
    students: [],
    setStudents: (students: any) => {},
    selectedClass: {},
    setSelectedClass: (selectedClass: any) => { },
    attendanceList: [],
    setAttendanceList: (attendanceList: any) => { }
})

export const ClassContextProvider = ({ children }: { children: React.ReactNode }) => {

    const [classes, setClasses] = useState<any>(null)
    const [selectedClass, setSelectedClass] = useState<any>(null)
    const [students, setStudents] = useState<any>(null)
    const [attendanceList, setAttendanceList] = useState<any>(null)

    return (
        <ClassContext.Provider value={{ classes, setClasses, selectedClass, setSelectedClass, students, setStudents,attendanceList,setAttendanceList }}>
            {children}
        </ClassContext.Provider>
    )
}

const useClassContext = () => {
    return useContext(ClassContext)
}

export default useClassContext
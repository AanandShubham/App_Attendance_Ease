import React, { useContext, useState } from "react"

type SelectedClass = {
    selectedClassId: string,
    selectedClassName: string
}

type ClassContextType = {
    classes: any,
    setClasses: (classes: any) => void,
    selectedClass: SelectedClass | null,
    setSelectedClass: (selectedClasse: SelectedClass) => void
}

export const ClassContext = React.createContext<ClassContextType | undefined>(undefined)

export const ClassContextProvider = ({ children }: { children: React.ReactNode }) => {

    const [classes, setClasses] = useState<any>(null)
    const [selectedClass, setSelectedClass] = useState<SelectedClass | null>(null)

    return (
        <ClassContext.Provider value={{ classes, setClasses, selectedClass, setSelectedClass }}>
            {children}
        </ClassContext.Provider>
    )
}

const useClassContext = ()=>{
    return useContext(ClassContext)
}

export default useClassContext
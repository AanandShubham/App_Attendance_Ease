import * as Print from "expo-print"
import * as Sharing from "expo-sharing"
import { useState } from "react"
import useClassContext from "../context/ClassContext"
import Toast from "react-native-toast-message"

const usePrintPdf = () => {
  const [loading, setLoading] = useState(false)
  const { selectedClass } = useClassContext()

  const generateAttendancePdf = async (data: any) => {
    setLoading(true)
    try {
      const html = `
                       <html>
                           <body style="font-family: Arial; padding:20px;">
    
                            <!-- Inner Border -->
                              <div style="
                                border: 2px solid #0C5AA2; 
                                border-radius:5px 30px 5px 30px;
                              ">

                            <!-- Title Box -->
                            <div style="
                              text-align:center; 
                              font-size:22px; 
                              font-weight:bold; 
                              border:2px solid #0C5AA2; 
                              width: 30%; 
                              margin:auto; 
                              padding:5px;
                              position:absolute;
                              left:35%;
                              top:7px;
                              background-color:#3A87BD;
                              margin-bottom:15px;
                              border-radius:5px 20px 5px 20px;
                              color:white;
                            ">
                              Attendance Report
                            </div>

                            <!-- Class Info Row -->

                            <div style="display:flex; justify-content:space-between; padding:10px; align-items:center; margin-top:10px;">
                              <div style=" font-size:16px; font-weight:bold; padding-top:5px; padding-right:5px;  display:flex; flex-direction:column; justify-content:justify-start; align-items:start;">
                                  <p><b>Name :</b> ${data.name}</p>
                                  <p><b>Room No :</b> ${data.roomNo}</p>
                                  <p><b>Subject :</b> ${data.subject}</p>
                              </div>

                              <div style="font-size:16px; font-weight:bold; padding-top:5px; padding-left:10px; display:flex; flex-direction:column; justify-content:justify-start; align-items:start">
                                  <p><b>Date :</b> ${data.date}</p> 
                                  <p><b>Time :</b> ${data.Time}</p>
                                  <p><b>Total Attendance :</b> ${data.totalClassAttendance}</p>
                              </div>
                            </div>

                            <br />

                            <!-- Table -->
                            <div style="border-top:0px solid #0C5AA2;"> 
                              <table style="width:100%; border-collapse: collapse; font-size:16px; ">
                              <tr >
                                <th style="border-top:2px solid #0c5aa2; border-bottom:2px solid #0c5aa2;">Ser. No </th>
                                <th style="border-top:2px solid #0c5aa2; border-bottom:2px solid #0c5aa2; border-right:2px solid #0c5aa2;">Student ID</th>
                                <th style="border-top:2px solid #0c5aa2; border-bottom:2px solid #0c5aa2; border-right:2px solid #0c5aa2;">Name</th>
                                <th style="border-top:2px solid #0c5aa2; border-bottom:2px solid #0c5aa2;">Attendance</th>
                              </tr>

                                ${data.students
          .map((s: any, index: any) => {
            let totalAttendance = s.classList.find(
              (details: any) => details.classId === selectedClass._id)?.totalAttendance | 0
            const percent = ((totalAttendance / selectedClass.attendance.length) * 100).toFixed(1)
            console.log("Percent : ", percent)
            return `
                                        <tr>
                                          <td style="border-top:2px solid #0c5aa2; border-bottom:0px solid #0c5aa2; border-right:2px solid #0c5aa2; text-align:center;">${index+1}</td>
                                          <td style="border-top:2px solid #0c5aa2; border-bottom:0px solid #0c5aa2; border-left:2px solid #0c5aa2; border-right:2px solid #0c5aa2; text-align:center;">${s.tca.toUpperCase()}</td>
                                          <td style="border-top:2px solid #0c5aa2; border-bottom:0px solid #0c5aa2; border-left:2px solid #0c5aa2; border-right:2px solid #0c5aa2; text-align:center;">${s.name.toUpperCase()}</td>

                                          <td style="border-top:2px solid #0c5aa2; border-bottom:0px solid #0c5aa2; border-left:2px solid #0c5aa2; text-align:center;">${selectedClass.attendance.length} / ${totalAttendance} (${percent}%)
                                          </td>
                                        </tr>
                                        `;
          })
          .join("")}
                                  </table>
                                  </div>
                              </div>
                            </body>
                            </html>
                          `;

      const { uri } = await Print.printToFileAsync({ html })
      console.log("PDF created:", uri)

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri)
      }
    } catch (error) {
      console.log("PDF Error =>", error)
      Toast.show({
        type: "error",
        text1: "Error generating PDF",
        text2: "Please try again later.",
      })
    } finally {
      setLoading(false)
    }
  }

  return { loading, generateAttendancePdf }
}

export default usePrintPdf

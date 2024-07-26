export const R_SUCCESS = 'R_SUCCESS'
export const R_INVALID_INFO = 'R_INVALID_INFO'
export const R_ID_NOT_FOUND = 'R_ID_NOT_FOUND'
export const R_INVALID_RESERVATION = 'R_INVALID_RESERVATION'
export const R_SEND_EMAIL_FAILED = 'R_SEND_EMAIL_FAILED'
export const R_ALREADY_VERIFIED = 'R_ALREADY_VERIFIED'

export const handle_response = (error_code,type=null) => {
    switch(error_code){
        case R_SUCCESS:
            if(type == "edit"){
                return {dialog_text:"預約更改成功",dialog_title:"預約成功"}
            }else if(type == "new"){
                return {dialog_text:"預約新增成功，請查看email，並進行驗證",dialog_title:"預約成功"}
            }else if(type == "verify"){
                
                return {dialog_text:"此筆預約驗證成功",dialog_title:"驗證成功"}
            }
        case R_INVALID_INFO:
            return {dialog_alert:'error', dialog_ContentFlag:false,dialog_text:"表單資訊錯誤",dialog_title:"預約失敗"}
        case R_ID_NOT_FOUND:
            if(type == "edit")
                return {dialog_text:"請確認預約代碼，或洽系統管理員",dialog_title:"預約失敗"}
            if(type == "verify")
                return {dialog_alert:'error', dialog_ContentFlag:false, dialog_text:"請確認預約代碼，或洽系統管理員",dialog_title:"認證失敗"}
        case R_INVALID_RESERVATION:
            return {dialog_text:"借用時間有誤，請先確認可借用時間",dialog_title:"預約失敗"}
        case R_SEND_EMAIL_FAILED:
            return {dialog_text:"伺服器錯誤，請洽系統管理員",dialog_title:"預約失敗"}
        case R_ALREADY_VERIFIED:
            return {dialog_alert:'warning', dialog_ContentFlag:true,dialog_text:"此預約已驗證",dialog_title:"重複驗證"}
        default:
            return {dialog_text:"發生了未知錯誤，請洽系統管理員",dialog_title:"預約失敗"}
    }
}


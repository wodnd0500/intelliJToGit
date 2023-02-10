package com.cjw;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class fileUploadDownload {
    public static void main(String[] args){
        //파일 업로드에 필요한 것은? 파일의 경로와 업로드할 파일의 이름
        //파일이름
        //request로 직접 받는경우가 대부분

        //경로를 만들시 "앞에들어갈 아무이름/+연+/+월+/+일? 경로는 만드는 나름이니까 만약 이런식으로 간다면
       /* String year = DateUtil*/
        Map<String,Object> map = new HashMap<>();
        SimpleDateFormat format = new SimpleDateFormat("yyyyMMdd");
        Date now = new Date();
        String now_dt = format.format(now);
        System.out.println(now_dt);

        String year = now_dt.substring(0,4);
        String month = now_dt.substring(4,6);
        String day = now_dt.substring(6,8);
        System.out.println(year);
        System.out.println(month);
        System.out.println(day);

        String path ="최재웅/"+year+"/"+month+"/"+day;
        System.out.println(path);

        /*String fileName = 직접받아오자*/
        //String filePath = path + fileName;

       /* map.put("fileName",fileName);
        map.put("path",path);
        map.put("filePath",filePath);*/
    /*    if(map.get("filePath").equals(path+file)){
            map.put("filePath2",filePath);
        }*/


    }
}

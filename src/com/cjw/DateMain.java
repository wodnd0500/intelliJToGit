package com.cjw;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class DateMain {

    public static void main(String[] args){
        String date = "2022-12-22";
        LocalDate localDate = LocalDate.parse(date, DateTimeFormatter.ofPattern("yyyy-MM-dd"));
        System.out.println(localDate.toString());

        //List<String> list = new ArrayList<>();
        List<Map<String,Object>> list = new ArrayList<>();
        Map<String,Object> map = new HashMap<>();

        for(int i=0; i<24; i++){
            map = new HashMap<>();
            LocalDateTime localDateTime1 = localDate.atTime(i,0);
            String start = localDateTime1.format(DateTimeFormatter.ofPattern("yyyyMMddHH"));
            map.put("start", start);

            //1시간씩 증가, ChronoUnit을 안쓸경우 23시에서 다음날 넘어갈 경우 에러발생.
            LocalDateTime localDateTime2 = localDateTime1.plus(1, ChronoUnit.HOURS);
            String end = localDateTime2.format(DateTimeFormatter.ofPattern("yyyyMMddHH"));
            map.put("end", end);

            list.add(map);
            //System.out.println(list);
        }

        for(Map<String, Object> map2: list){
            //System.out.println("aa:" + map2);
            String a = (String) map2.get("start");
            String b = (String) map2.get("end");

            System.out.println("start:" + a);
            System.out.println("end:" + b);

        }
    }

}

package com.cjw;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class ListToMap {

    public static void main(String[] args) {
        List<String> list = new ArrayList<>();
        list.add("aaaca");
        list.add("aaa");
        list.add("aaa");
        list.add("bbbcccs");
        list.add("ccc");

        Map<String, Long> map = new HashMap<>();

        for(String target : list){
            Long num = map.get(target);
            if(num == null){
                map.put(target, 1L);
            } else {
                map.put(target, num+1);
            }
        }
        System.out.println("list 객체를 map으로:" + map);


        map = list.stream()
                .collect(Collectors.groupingBy( arg -> arg, HashMap::new, Collectors.counting()));
        System.out.println("list 객체를 map으로2:" + map);



        String add1 = "add1";
        String add2 = "add2";
        String add3 = "add3";

        Map<String,Object> Hmap = new HashMap<>();
        Hmap.put("add1" ,add1 );
        Hmap.put("add2" ,add2 );
        Hmap.put("add3" ,add3 );

        List<Map<String,Object>> list2 = new ArrayList<>();
        list2.add(Hmap);
        System.out.println("list2:" + list2);

        //새로운리스트 생성
        List<Map<String,Object>> newList = new ArrayList<>();
        //Map을 for문 돌려준다 list2의 있는 값을 이용하여서
        for(Map<String,Object> newMap : list2 ){
            String a = String.valueOf(newMap.get("add1"));
            String b = String.valueOf(newMap.get("add2"));
            String c = String.valueOf(newMap.get("add3"));

            newMap.put("a+b:" , a+b);

            newList.add(newMap);
        }

        System.out.println("newList:" + newList);
    }

}

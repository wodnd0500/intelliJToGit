package com.cjw;

import com.sun.deploy.util.StringUtils;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Search {
    public static void main(String args[]){

        Map<String,Object> map = new HashMap<>();
        String category = "검색카테고리";
        String search = "검색어";
        map.put("key",category);
        map.put("search",search);

        String key = String.valueOf(map.get("key"));
        String search2 = String.valueOf(map.get("search"));

        //검색할 임의의 리스트
        List<Map<String,Object>> list = null;

        if(String.valueOf(map.get("key")) != null && String.valueOf(map.get("search")) != null){
            //만들어 져 있던 api 사용한 것
            //list = List.newArrayList(Collections2.filter(list,arg -> String.valueOf(arg.get(map.get("search"))).contains(map.get("key))));

        }
    }
}

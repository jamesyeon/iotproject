package com.leenak0.airgraphapp;

import android.os.AsyncTask;
import android.util.Log;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.HashMap;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

public class Task extends AsyncTask<String[],Void,String[]> {

    private String str, receiveMsg;
    String[] arraysum = new String[36];

    protected String[] doInBackground(String[]... params) {
        URL url = null;

        try {
            url = new URL("http://114.70.37.15/airdata/sensor2_recent12");

            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");

            if (conn.getResponseCode() == conn.HTTP_OK) {
                InputStreamReader tmp = new InputStreamReader(conn.getInputStream(), "UTF-8");
                BufferedReader reader = new BufferedReader(tmp);
                StringBuffer buffer = new StringBuffer();
                while ((str = reader.readLine()) != null) {
                    buffer.append(str);
                }
                receiveMsg = buffer.toString();

                String d0 = null;
                String d1 = null;
                String time = null;

                try {
                    JSONArray jarray = new JSONObject(receiveMsg).getJSONArray("data");
                    for (int i = 0; i < jarray.length(); i++) {

                        HashMap map = new HashMap<>();
                        JSONObject jObject = jarray.getJSONObject(i);

                        d0 = jObject.optString("d0");
                        d1 = jObject.optString("d1");
                        time = jObject.optString("date_format(time, '%H')");

                        arraysum[i] = d0;
                        arraysum[i+12] = d1;
                        arraysum[i+24] = time;
                    }
                    for(int i=0; i<36; i++){
                        Log.i("결과값",arraysum[i]);
                    }
                } catch (JSONException e) {
                    e.printStackTrace();
                }
                Log.i("receiveMsg : ", receiveMsg);
                reader.close();
            } else {
                Log.i("통신 결과", conn.getResponseCode() + "에러");
            }
        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return arraysum;
    }
}
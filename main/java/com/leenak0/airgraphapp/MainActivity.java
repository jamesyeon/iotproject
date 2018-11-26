package com.leenak0.airgraphapp;

import android.graphics.Color;
import android.os.AsyncTask;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.widget.TextView;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.nio.charset.Charset;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import com.github.mikephil.charting.animation.Easing;
import com.github.mikephil.charting.charts.LineChart;
import com.github.mikephil.charting.components.AxisBase;
import com.github.mikephil.charting.components.Description;
import com.github.mikephil.charting.components.YAxis;
import com.github.mikephil.charting.components.XAxis;
import com.github.mikephil.charting.data.Entry;
import com.github.mikephil.charting.data.LineData;
import com.github.mikephil.charting.data.LineDataSet;
import com.github.mikephil.charting.formatter.IAxisValueFormatter;
import com.github.mikephil.charting.interfaces.datasets.ILineDataSet;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.concurrent.ExecutionException;

public class MainActivity extends AppCompatActivity {

    private LineChart lineChart;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        //TextView textView = (TextView)findViewById(R.id.parsetext);
        String[] resultText = new String[36];

        try {
            resultText = new Task().execute().get();
        } catch (InterruptedException e) {
            e.printStackTrace();
        } catch (ExecutionException e) {
            e.printStackTrace();
        }

        //textView.setText(resultText[0]);

        lineChart = (LineChart)findViewById(R.id.chart);

        final ArrayList<String> timeentries = new ArrayList<>();
        ArrayList<Entry> d0entries = new ArrayList<>();
        ArrayList<Entry> d1entries = new ArrayList<>();

        /*int x = 23;

        for(int i=1; i<13; i++){
            timeentries.add(i,resultText[x]);
            x++;
        }

        timeentries.add(1,resultText[24]);
        timeentries.add(2,String.valueOf(25));
        timeentries.add(3,String.valueOf(26));
        timeentries.add(4,String.valueOf(27));
        timeentries.add(5,String.valueOf(28));
        timeentries.add(6,String.valueOf(29));
        timeentries.add(7,String.valueOf(30));
        timeentries.add(8,String.valueOf(31));
        timeentries.add(9,String.valueOf(32));
        timeentries.add(10,String.valueOf(33));
        timeentries.add(11,String.valueOf(34));
        timeentries.add(12,String.valueOf(35));*/

        d0entries.add(new Entry(Integer.parseInt(resultText[35]), Integer.parseInt(resultText[11])));
        d1entries.add(new Entry(Integer.parseInt(resultText[35]),Integer.parseInt(resultText[23])));
        d0entries.add(new Entry(Integer.parseInt(resultText[34]), Integer.parseInt(resultText[10])));
        d1entries.add(new Entry(Integer.parseInt(resultText[34]),Integer.parseInt(resultText[22])));
        d0entries.add(new Entry(Integer.parseInt(resultText[33]), Integer.parseInt(resultText[9])));
        d1entries.add(new Entry(Integer.parseInt(resultText[33]),Integer.parseInt(resultText[21])));
        d0entries.add(new Entry(Integer.parseInt(resultText[32]), Integer.parseInt(resultText[8])));
        d1entries.add(new Entry(Integer.parseInt(resultText[32]),Integer.parseInt(resultText[20])));
        d0entries.add(new Entry(Integer.parseInt(resultText[31]), Integer.parseInt(resultText[7])));
        d1entries.add(new Entry(Integer.parseInt(resultText[31]),Integer.parseInt(resultText[19])));
        d0entries.add(new Entry(Integer.parseInt(resultText[30]), Integer.parseInt(resultText[6])));
        d1entries.add(new Entry(Integer.parseInt(resultText[30]),Integer.parseInt(resultText[18])));
        d0entries.add(new Entry(Integer.parseInt(resultText[29]), Integer.parseInt(resultText[5])));
        d1entries.add(new Entry(Integer.parseInt(resultText[29]),Integer.parseInt(resultText[17])));
        d0entries.add(new Entry(Integer.parseInt(resultText[28]), Integer.parseInt(resultText[4])));
        d1entries.add(new Entry(Integer.parseInt(resultText[28]),Integer.parseInt(resultText[16])));
        d0entries.add(new Entry(Integer.parseInt(resultText[27]), Integer.parseInt(resultText[3])));
        d1entries.add(new Entry(Integer.parseInt(resultText[27]),Integer.parseInt(resultText[15])));
        d0entries.add(new Entry(Integer.parseInt(resultText[26]), Integer.parseInt(resultText[2])));
        d1entries.add(new Entry(Integer.parseInt(resultText[26]),Integer.parseInt(resultText[14])));
        d0entries.add(new Entry(Integer.parseInt(resultText[25]), Integer.parseInt(resultText[1])));
        d1entries.add(new Entry(Integer.parseInt(resultText[25]),Integer.parseInt(resultText[13])));
        d0entries.add(new Entry(Integer.parseInt(resultText[24]), Integer.parseInt(resultText[0])));
        d1entries.add(new Entry(Integer.parseInt(resultText[24]),Integer.parseInt(resultText[12])));

        String[] time = new String[timeentries.size()];
        for(int i=0; i<timeentries.size(); i++){
            time[i] = timeentries.get(i).toString();
        }

        ArrayList<ILineDataSet> lineDataSets = new ArrayList<>();

        LineDataSet lineDataSetd0 = new LineDataSet(d0entries, "sensor2_d0");
        lineDataSetd0.setDrawCircles(false);
        lineDataSetd0.setColor(Color.BLUE);

        LineDataSet lineDataSetd1 = new LineDataSet(d1entries, "sensor2_d1");
        lineDataSetd1.setDrawCircles(false);
        lineDataSetd1.setColor(Color.RED);

        lineDataSets.add(lineDataSetd0);
        lineDataSets.add(lineDataSetd1);

        LineData lineData = new LineData(lineDataSets);
        lineChart.setData(lineData);

        XAxis xAxis = lineChart.getXAxis();
        //xAxis.setGranularity(1f);
        xAxis.setPosition(XAxis.XAxisPosition.BOTTOM);
        xAxis.setTextColor(Color.BLACK);

        YAxis yLAxis = lineChart.getAxisLeft();
        yLAxis.setTextColor(Color.BLACK);

        YAxis yRAxis = lineChart.getAxisRight();
        yRAxis.setDrawLabels(false);
        yRAxis.setDrawAxisLine(false);
        yRAxis.setDrawGridLines(false);

        Description description = new Description();
        description.setText("");

        lineChart.setDoubleTapToZoomEnabled(false);
        lineChart.setDrawGridBackground(false);
        lineChart.setDescription(description);
        lineChart.animateY(2000, Easing.EasingOption.EaseInCubic);
        lineChart.invalidate();

    }
}
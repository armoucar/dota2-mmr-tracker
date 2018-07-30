fetch("data/storage.json")
    .then((r) => r.json())
    .then(function (mmrData) {

        google.charts.load('current', { packages: ['corechart', 'line'] });
        google.charts.setOnLoadCallback(drawBasic);

        function drawBasic() {

            var dataSolo = new google.visualization.DataTable();
            dataSolo.addColumn('date', 'X');
            dataSolo.addColumn('number', 'MMR Gained');
            dataSolo.addRows(mmrData.solo.map((s) => [new Date(s.ts), s.mmr]));

            var dataParty = new google.visualization.DataTable();
            dataParty.addColumn('date', 'X');
            dataParty.addColumn('number', 'MMR Gained');
            dataParty.addRows(mmrData.party.map((s) => [new Date(s.ts), s.mmr]));

            var options = {
                hAxis: { title: 'Time' },
                vAxis: { title: 'MMR' }
            };

            var chartSolo = new google.visualization.LineChart(document.getElementById('mmr-solo'));
            chartSolo.draw(dataSolo, options);

            var chartParty = new google.visualization.LineChart(document.getElementById('mmr-party'));
            chartParty.draw(dataParty, options);
        }
    });
To run the node-red json data, open the file and copy the data and paste it in the import option of your native node-red application.
Two flows will be displayed, one for triggering the IP broadcast to the esps.
The other is for listing to the log data sent from the esp, parse it and send it to three locations:
1) the firebase database
2) the slack webhook for my light swarm channel
3) debug window to check the data.


The second file is a node.js file which upon running (call node proj.js from the direc where the file is saved), will fetch the data from the firebase node API
and after parsing the data, populating separate buffers and calculating the min, max and the average reading for each buffer window, we display the master and slave window data.
While the script runs, any new data will be fetched as a new snapshot and collated (thus the entire database as a stream of incoming data).

 

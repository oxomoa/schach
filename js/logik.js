// logik.js beinhaltet alle Objekte, die mit der Spiellogik zusammenhängen 
			
			function k_initialisierung()
			{

				kint_fehlercode = 0;
				kstr_fehlermeldung = 0;
				
				kint_zugrecht = 0;
				kbol_zughilfe = 0;
				kbol_bedrohungshilfe = 0;

				karr_historie = new Array();
				karr_figuren = new Array();
				karr_felder = new Array();
															// Figurenzähler, zählen geschlagene Figuren. Reihenfolge: B,L,S,T,D
				karr_zaehler_w = new Array(0,0,0,0,0);		// Zähler für weisse Figuren
				karr_zaehler_s = new Array(0,0,0,0,0);		// Zähler für schwarze Figuren
			
				kbol_inBedrohungslage = false;
			
				k_initFiguren();
				k_initFelder();
				
				k_bedrohungslage();
				
				
				//GUI-Funktionen
				dragDropInit();
				
				//TEST!!
				//karr_figuren[4].bewegen(karr_felder[32]);
				//k_bedrohungslage();
				// TEST ENDE
				
			}
			
			
			function error_handling (fehler) {   //#*#
				switch (fehler) {
					case 1: kstr_fehlermeldung = "Sie sind nicht am Zug!"; break;
					case 2: kstr_fehlermeldung = "Dieser Zug ist für diese Figur ungültig!"; break;
					case 3: kstr_fehlermeldung = "Eigene Figuren können nicht geschlagen werden!"; break;
					case 4: kstr_fehlermeldung = "Sichtlinie ist nicht frei!"; break;
					case 5: kstr_fehlermeldung = "Ihr König steht im Schach!"; break;
					case 6: kstr_fehlermeldung = "Der Turm kann nur horizontal oder vertikal bewegt werden!"; break;
					case 7: kstr_fehlermeldung = "Der schwarze König steht im Schach!"; break;
					case 8: kstr_fehlermeldung = "Der weiße König steht im Schach!"; break;
					case 9: kstr_fehlermeldung = "Schwarz ist schachmatt!"; break;
					case 10 : kstr_fehlermeldung = "Weiß ist schachmatt!"; break;
				}
				//alert(kstr_fehlermeldung);
				error_ausgabe(kstr_fehlermeldung);
			}
			
			
			function k_schachmatt(farbe)
			{//TODO   Hier kommt noch was rein falls Schachmatt ist.
			
				if (farbe == 0)
				{
					//alert("Schachmatt für schwarz!")
					error_handling(kint_fehlercode=10);			// #*#
				}
				else
				{
					//alert("Schachmatt für weiss!")
					error_handling(kint_fehlercode=9);			// #*#
				}
			}
			
			function k_bedrohungslage()
			{
			kbol_inBedrohungslage = true;
			
				for(var i = 0; i < karr_felder.length; i++)		//Schleife über alle Felder, Bedrohungen auf false setzen 
				{
					karr_felder[i].bol_wBed = false;
					karr_felder[i].bol_sBed = false;
				}
				
				for(var i = 0; i < karr_figuren.length; i++)	// Schleife über alle Figuren
				{
					if (karr_figuren[i].aktiv == false)			// Aktivität feststellen
					{										
					}											// nichts tun
					else
					{
						karr_figuren[i].bedrohung();			// Figur.bedrohung aufrufen
					}
					
				}
			
						
				if (karr_felder[id0k0.int_feldIndex].bol_sBed == true)
				{
					//alert("Schach dem weißen König!");
					error_handling(kint_fehlercode=8);		// #*#
				}
				
				if (karr_felder[id1k0.int_feldIndex].bol_wBed == true)
				{
					//alert("Schach dem schwarzen König!");
					error_handling(kint_fehlercode=7);		// #*#
				}

				
				kbol_inBedrohungslage = false;
			
			}
			
		
			function k_initFiguren()
			{ //pstr_id, pint_yPos, pint_xPos, pint_farbe, pcha_typ, pint_feldIndex
			
				// hier jetzt alle, KÖNIGE  ZULETZT (wegen der Bedrohungslage, weil Könige nicht auf einem bedrohten Feld stehen bleiben dürfen, das nennt man Schach)
				
				//weisse Bauern
				id0b0 = new Bauer("id0b0",2,1,0,"b",21);
				id0b1 = new Bauer("id0b1",2,2,0,"b",22);
				id0b2 = new Bauer("id0b2",2,3,0,"b",23);
				id0b3 = new Bauer("id0b3",2,4,0,"b",24);
				id0b4 = new Bauer("id0b4",2,5,0,"b",25);
				id0b5 = new Bauer("id0b5",2,6,0,"b",26);
				id0b6 = new Bauer("id0b6",2,7,0,"b",27);
				id0b7 = new Bauer("id0b7",2,8,0,"b",28);
				
				//weisse Offiziere
				id0l0 = new Laeufer("id0l0",1,3,0,"l",13);
				id0l1 = new Laeufer("id0l1",1,6,0,"l",16);
				id0s0 = new Springer("id0s0",1,2,0,"s",12);
				id0s1 = new Springer("id0s1",1,7,0,"s",17);
				id0t0 = new Turm("id0t0",1,1,0,"t",11);
				id0t1 = new Turm("id0t1",1,8,0,"t",18);
				id0d0 = new Dame("id0d0",1,4,0,"d",14);
				
				//schwarze Bauern
				id1b0 = new Bauer("id1b0",7,1,1,"b",71);
				id1b1 = new Bauer("id1b1",7,2,1,"b",72);
				id1b2 = new Bauer("id1b2",7,3,1,"b",73);
				id1b3 = new Bauer("id1b3",7,4,1,"b",74);
				id1b4 = new Bauer("id1b4",7,5,1,"b",75);
				id1b5 = new Bauer("id1b5",7,6,1,"b",76);
				id1b6 = new Bauer("id1b6",7,7,1,"b",77);
				id1b7 = new Bauer("id1b7",7,8,1,"b",78);
				
				//schwarze Offiziere
				id1l0 = new Laeufer("id1l0",8,3,1,"l",83);
				id1l1 = new Laeufer("id1l1",8,6,1,"l",86);
				id1s0 = new Springer("id1s0",8,2,1,"s",82);
				id1s1 = new Springer("id1s1",8,7,1,"s",87);
				id1t0 = new Turm("id1t0",8,1,1,"t",81);
				id1t1 = new Turm("id1t1",8,8,1,"t",88);
				id1d0 = new Dame("id1d0",8,4,1,"d",84);
				
				//Könige
				id0k0 = new Koenig("id0k0",1,5,0,"k",15); 		// weisser König
				id1k0 = new Koenig("id1k0",8,5,1,"k",85); 		// schwarzer König
				
				
				id9n9 = new Nix("id9n9",8,9,9,"n",89)			// Dummy-Figur, damit das Leerfeld (89) bei Initialisierung nicht leer ist 
			
				//Einordnung in das Array			0							   5							         10							    15							         20							   25									    31
				karr_figuren = new Array (id0b0,id0b1,id0b2,id0b3,id0b4,id0b5,id0b6,id0b7,id0l0,id0l1,id0s0,id0s1,id0t0,id0t1,id0d0,id1b0,id1b1,id1b2,id1b3,id1b4,id1b5,id1b6,id1b7,id1l0,id1l1,id1s0,id1s1,id1t0,id1t1,id1d0,id0k0,id1k0);
			
				// alle Figuren aus dem Array auf das Schachbrett setzen
			    setzeFiguren(karr_figuren);
			}
			
			
			
			function k_getFigurIndex (pstr_SuchID)					//Einfache lineare Suche zum Feststellen eines Figur-Index.
			{
				for (var i = 0; i < karr_figuren.length; i++ )
				{
					if (pstr_SuchID == karr_figuren[i].str_id)
					{
						return i;
					}
				}
			}
			
			
			function k_berechneID (pcha_figurTyp, pint_farbe)			// Methode zur Berechnung einer neuen Figur-ID
			{
				var lint_letzterIndex = -1;
				var lint_neuerIndex = 0;
				
				for (var i = 0; i < karr_figuren.length; i++ )
				{
					
					if(karr_figuren[i].int_farbe == pint_farbe && karr_figuren[i].cha_typ == pcha_figurTyp)
					{
						lint_letzterIndex = lint_letzterIndex+1;
					}
														
				}
				
				lint_neuerIndex = lint_letzterIndex + 1;
				return "id"+pint_farbe+""+pcha_figurTyp+""+lint_neuerIndex;
			}
						
			
			function k_initFelder()
			{	// Feld(pint_yPos, pint_xPos, pbol_sBed, pbol_wBed, pobj_figur
							
				// Die ersten 10 Stellen werden absichtlich leer gelassen, damit die Indizes der Felder genau ihren Koordinaten entsprechen
				// Die Stellen  dazwischen werden auch mit leeren Strings gefüllt.
				karr_felder[0] = ""
				karr_felder[1] = ""
				karr_felder[2] = ""
				karr_felder[3] = ""
				karr_felder[4] = ""
				karr_felder[5] = ""
				karr_felder[6] = ""
				karr_felder[7] = ""
				karr_felder[8] = ""
				karr_felder[9] = ""
				karr_felder[10] = ""
			
				karr_felder[11] = new Feld(1, 1, false, false,karr_figuren[12],11);  // a1
				karr_felder[12] = new Feld(1, 2, false, false,karr_figuren[10],12);  // b1
				karr_felder[13] = new Feld(1, 3, false, false,karr_figuren[8],13);  // c1
				karr_felder[14] = new Feld(1, 4, false, false,karr_figuren[14],14);  // d1
				karr_felder[15] = new Feld(1, 5, false, false,karr_figuren[30],15);  // e1
				karr_felder[16] = new Feld(1, 6, false, false,karr_figuren[9],16);  // f1
				karr_felder[17] = new Feld(1, 7, false, false,karr_figuren[11],17);  // g1
				karr_felder[18] = new Feld(1, 8, false, false,karr_figuren[13],18);  // h1
				
					karr_felder[19] = ""
					karr_felder[20] = ""
				
				karr_felder[21] = new Feld(2, 1, false, false,karr_figuren[0],21);  // a2	
				karr_felder[22] = new Feld(2, 2, false, false,karr_figuren[1],22);  // b2	
				karr_felder[23] = new Feld(2, 3, false, false,karr_figuren[2],23);  // c2	
				karr_felder[24] = new Feld(2, 4, false, false,karr_figuren[3],24);  // d2	
				karr_felder[25] = new Feld(2, 5, false, false,karr_figuren[4],25);  // e2	
				karr_felder[26] = new Feld(2, 6, false, false,karr_figuren[5],26);  // f2	
				karr_felder[27] = new Feld(2, 7, false, false,karr_figuren[6],27);  // g2	
				karr_felder[28] = new Feld(2, 8, false, false,karr_figuren[7],28);  // h2
					
					karr_felder[29] = ""
					karr_felder[30] = ""
					
				karr_felder[31] = new Feld(3, 1, false, false,"",31);  // a3	
				karr_felder[32] = new Feld(3, 2, false, false,"",32);  // b3	
				karr_felder[33] = new Feld(3, 3, false, false,"",33);  // c3	
				karr_felder[34] = new Feld(3, 4, false, false,"",34);  // d3	
				karr_felder[35] = new Feld(3, 5, false, false,"",35);  // e3
				karr_felder[36] = new Feld(3, 6, false, false,"",36);  // f3
				karr_felder[37] = new Feld(3, 7, false, false,"",37);  // g3
				karr_felder[38] = new Feld(3, 8, false, false,"",38);  // h3
					
					karr_felder[39] = ""
					karr_felder[40] = ""
					
				karr_felder[41] = new Feld(4, 1, false, false,"",41);  // a4
				karr_felder[42] = new Feld(4, 2, false, false,"",42);  // b4
				karr_felder[43] = new Feld(4, 3, false, false,"",43);  // c4
				karr_felder[44] = new Feld(4, 4, false, false,"",44);  // d4
				karr_felder[45] = new Feld(4, 5, false, false,"",45);  // e4
				karr_felder[46] = new Feld(4, 6, false, false,"",46);  // f4
				karr_felder[47] = new Feld(4, 7, false, false,"",47);  // g4
				karr_felder[48] = new Feld(4, 8, false, false,"",48);  // h4
					
					karr_felder[49] = ""
					karr_felder[50] = ""
					
				karr_felder[51] = new Feld(5, 1, false, false,"",51);  // a5	
				karr_felder[52] = new Feld(5, 2, false, false,"",52);  // b5
				karr_felder[53] = new Feld(5, 3, false, false,"",53);  // c5
				karr_felder[54] = new Feld(5, 4, false, false,"",54);  // d5
				karr_felder[55] = new Feld(5, 5, false, false,"",55);  // e5
				karr_felder[56] = new Feld(5, 6, false, false,"",56);  // f5
				karr_felder[57] = new Feld(5, 7, false, false,"",57);  // g5
				karr_felder[58] = new Feld(5, 8, false, false,"",58);  // h5
				
					karr_felder[59] = ""
					karr_felder[60] = ""
					
				karr_felder[61] = new Feld(6, 1, false, false,"",61);  // a6
				karr_felder[62] = new Feld(6, 2, false, false,"",62);  // b6
				karr_felder[63] = new Feld(6, 3, false, false,"",63);  // c6
				karr_felder[64] = new Feld(6, 4, false, false,"",64);  // d6
				karr_felder[65] = new Feld(6, 5, false, false,"",65);  // e6
				karr_felder[66] = new Feld(6, 6, false, false,"",66);  // f6
				karr_felder[67] = new Feld(6, 7, false, false,"",67);  // g6
				karr_felder[68] = new Feld(6, 8, false, false,"",68);  // h6
					
					karr_felder[69] = ""
					karr_felder[70] = ""
						
				karr_felder[71] = new Feld(7, 1, false, false,karr_figuren[15],71);  // a7
				karr_felder[72] = new Feld(7, 2, false, false,karr_figuren[16],72);  // b7
				karr_felder[73] = new Feld(7, 3, false, false,karr_figuren[17],73);  // c7
				karr_felder[74] = new Feld(7, 4, false, false,karr_figuren[18],74);  // d7
				karr_felder[75] = new Feld(7, 5, false, false,karr_figuren[19],75);  // e7
				karr_felder[76] = new Feld(7, 6, false, false,karr_figuren[20],76);  // f7
				karr_felder[77] = new Feld(7, 7, false, false,karr_figuren[21],77);  // g7
				karr_felder[78] = new Feld(7, 8, false, false,karr_figuren[22],78);  // h7
					
					karr_felder[79] = ""
					karr_felder[80] = ""
							
				karr_felder[81] = new Feld(8, 1, false, false,karr_figuren[27],81);  // a8
				karr_felder[82] = new Feld(8, 2, false, false,karr_figuren[25],82);  // b8
				karr_felder[83] = new Feld(8, 3, false, false,karr_figuren[23],83);  // c8
				karr_felder[84] = new Feld(8, 4, false, false,karr_figuren[29],84);  // d8
				karr_felder[85] = new Feld(8, 5, false, false,karr_figuren[31],85);  // e8
				karr_felder[86] = new Feld(8, 6, false, false,karr_figuren[24],86);  // f8
				karr_felder[87] = new Feld(8, 7, false, false,karr_figuren[26],87);  // g8
				karr_felder[88] = new Feld(8, 8, false, false,karr_figuren[28],88);  // h8
				
					karr_felder[89] = new Feld(8, 9, false, false, id9n9,89);  // a8						  // Ablage für geschlagene Figuren
			
			}

			
			
			//############################# HISTORIE ###################################
			
						
function k_zugAnHistorie(quellFeld, zielFeld)  //übergeben wird jeweils (this.feld, feld)
{
	var lint_qxPos = quellFeld.int_xPos;
	var lint_qyPos = quellFeld.int_yPos;
	var lint_zxPos = zielFeld.int_xPos;
	var lint_zyPos = zielFeld.int_yPos;
	var lstr_zugString = "";
	switch(lint_qxPos)
	{ //die X-Position des Quellfelds wird in den Zug-String geschrieben
		case 1: lstr_zugString = lstr_zugString + "a"; break;
		case 2: lstr_zugString = lstr_zugString + "b"; break;
		case 3: lstr_zugString = lstr_zugString + "c"; break;
		case 4: lstr_zugString = lstr_zugString + "d"; break;
		case 5: lstr_zugString = lstr_zugString + "e"; break;
		case 6: lstr_zugString = lstr_zugString + "f"; break;
		case 7: lstr_zugString = lstr_zugString + "g"; break;
		case 8: lstr_zugString = lstr_zugString + "h"; break;
	}
	switch(lint_qyPos)
	{ //die Y-Position des Quellfelds wird in den Zug-String geschrieben
		case 1: lstr_zugString = lstr_zugString + "1"; break;
		case 2: lstr_zugString = lstr_zugString + "2"; break;
		case 3: lstr_zugString = lstr_zugString + "3"; break;
		case 4: lstr_zugString = lstr_zugString + "4"; break;
		case 5: lstr_zugString = lstr_zugString + "5"; break;
		case 6: lstr_zugString = lstr_zugString + "6"; break;
		case 7: lstr_zugString = lstr_zugString + "7"; break;
		case 8: lstr_zugString = lstr_zugString + "8"; break;
	}
	lstr_zugString = lstr_zugString + "-";
	switch(lint_zxPos)
	{ //die Y-Position des Zielfeld wird in den Zug-String geschrieben
		case 1: lstr_zugString = lstr_zugString + "a"; break;
		case 2: lstr_zugString = lstr_zugString + "b"; break;
		case 3: lstr_zugString = lstr_zugString + "c"; break;
		case 4: lstr_zugString = lstr_zugString + "d"; break;
		case 5: lstr_zugString = lstr_zugString + "e"; break;
		case 6: lstr_zugString = lstr_zugString + "f"; break;
		case 7: lstr_zugString = lstr_zugString + "g"; break;
		case 8: lstr_zugString = lstr_zugString + "h"; break;
	}
	switch(lint_zyPos)
	{ //die Y-Position des Zielfeld wird in den Zug-String geschrieben
		case 1: lstr_zugString = lstr_zugString + "1"; break;
		case 2: lstr_zugString = lstr_zugString + "2"; break;
		case 3: lstr_zugString = lstr_zugString + "3"; break;
		case 4: lstr_zugString = lstr_zugString + "4"; break;
		case 5: lstr_zugString = lstr_zugString + "5"; break;
		case 6: lstr_zugString = lstr_zugString + "6"; break;
		case 7: lstr_zugString = lstr_zugString + "7"; break;
		case 8: lstr_zugString = lstr_zugString + "8"; break;
	}
	if (karr_felder[karr_figuren[30].int_feldIndex].bol_sBed == true)
	{
		lstr_zugString = lstr_zugString + "+";
	}
	if (karr_felder[karr_figuren[31].int_feldIndex].bol_wBed == true)
	{
		lstr_zugString = lstr_zugString + "+";
	}
	lstr_zugString = lstr_zugString + "; ";
	karr_historie.push(lstr_zugString) //hier den neuen Zug ins Array hängen
}

function k_historieAnZug(str_uebergabe)  //übergeben wird jeweils (this.feld, feld)
{
	var lstr_zugEingabe = str_uebergabe;
	var lstr_zugVersuch = lstr_zugEingabe.substr(lstr_zugEingabe.indexOf("-")-2, 5);
	var lstr_qxVersuch = lstr_zugVersuch.substr(0,1);
	var lstr_qyVersuch = lstr_zugVersuch.substr(1,1);
	var lstr_zxVersuch = lstr_zugVersuch.substr(3,1);
	var lstr_zyVersuch = lstr_zugVersuch.substr(4,1);
	var lint_qVersuch = 0;
	var lint_zVersuch = 0;
	
	
/*	alert(lstr_zugVersuch);
	
	alert(lstr_qxVersuch);
	alert(lstr_qyVersuch);
	alert(lstr_zxVersuch);
	alert(lstr_zyVersuch);
*/	
	switch(lstr_qxVersuch)
	{ //
		case "a": lint_qVersuch = lint_qVersuch + 1; break;
		case "b": lint_qVersuch = lint_qVersuch + 2; break;
		case "c": lint_qVersuch = lint_qVersuch + 3; break;
		case "d": lint_qVersuch = lint_qVersuch + 4; break;
		case "e": lint_qVersuch = lint_qVersuch + 5; break;
		case "f": lint_qVersuch = lint_qVersuch + 6; break;
		case "g": lint_qVersuch = lint_qVersuch + 7; break;
		case "h": lint_qVersuch = lint_qVersuch + 8; break;
		
	}
	switch(lstr_qyVersuch)
	{ //
		case "1": lint_qVersuch = lint_qVersuch + 10; break;
		case "2": lint_qVersuch = lint_qVersuch + 20; break;
		case "3": lint_qVersuch = lint_qVersuch + 30; break;
		case "4": lint_qVersuch = lint_qVersuch + 40; break;
		case "5": lint_qVersuch = lint_qVersuch + 50; break;
		case "6": lint_qVersuch = lint_qVersuch + 60; break;
		case "7": lint_qVersuch = lint_qVersuch + 70; break;
		case "8": lint_qVersuch = lint_qVersuch + 80; break;
		
	}
	switch(lstr_zxVersuch)
	{ //
		case "a": lint_zVersuch = lint_zVersuch + 1; break;
		case "b": lint_zVersuch = lint_zVersuch + 2; break;
		case "c": lint_zVersuch = lint_zVersuch + 3; break;
		case "d": lint_zVersuch = lint_zVersuch + 4; break;
		case "e": lint_zVersuch = lint_zVersuch + 5; break;
		case "f": lint_zVersuch = lint_zVersuch + 6; break;
		case "g": lint_zVersuch = lint_zVersuch + 7; break;
		case "h": lint_zVersuch = lint_zVersuch + 8; break;
		
	}
	switch(lstr_zyVersuch)
	{ //
		case "1": lint_zVersuch = lint_zVersuch + 10; break;
		case "2": lint_zVersuch = lint_zVersuch + 20; break;
		case "3": lint_zVersuch = lint_zVersuch + 30; break;
		case "4": lint_zVersuch = lint_zVersuch + 40; break;
		case "5": lint_zVersuch = lint_zVersuch + 50; break;
		case "6": lint_zVersuch = lint_zVersuch + 60; break;
		case "7": lint_zVersuch = lint_zVersuch + 70; break;
		case "8": lint_zVersuch = lint_zVersuch + 80; break;
		
	}
	
		
	//alert(lint_qVersuch);
	//alert(lint_zVersuch);

	//k_zug(karr_felder[lint_qVersuch].obj_figur, karr_felder[lint_zVersuch]); 				//alt
	//zugAnHistorie(karr_felder[lint_qVersuch], karr_felder[lint_zVersuch]); 				//alt
	
	var obj_startFigur = karr_felder[lint_qVersuch].obj_figur;

	if(karr_felder[lint_qVersuch].obj_figur.zugPruefen(karr_felder[lint_zVersuch]))
	{
		
	//alert (obj_startFigur.str_id);		TEST: ID der ziehenden Figur ausgeben
	
		k_zug(karr_felder[lint_qVersuch].obj_figur, karr_felder[lint_zVersuch]);
		k_zugAnHistorie(karr_felder[lint_qVersuch], karr_felder[lint_zVersuch]);
		verschiebeFigur(obj_startFigur, karr_felder[lint_zVersuch]);						//Verschieben der Figur in der GUI
	}
		
	
}

function k_historieSpeichern()
{

}


/*

function k_historieLaden()
{
	while()
	{
		
	}
}

*/

function k_zugZurück()
{

}

function k_sucheInHistorie(str_uebergabe)
{ //diese Methode sucht Strings in der Historie und gibt die Stelle zurück, in der der String als erstes gefunden wurde
	lstr_suchString = str_uebergabe;
	lint_ergebnis = (-1);
	for(lint_i = 0; lint_i < karr_historie.length; lint_i ++)
	{
		lint_ergebnis = karr_historie[lint_i].indexOf(lstr_suchString);
		break; //nach dem ersten Auftreten des Suchstrings in der Schleife wird abgebrochen
	}
	return lint_ergebnis; //falls das Ergebnis -1 ist, dann ist das Feld noch nie angesprochen worden
}
			
	
			
			// ############################# ENDE HISTORIE ##############################
			
			
			
			
			function k_farbeAmZug(figur)
			{// ist der Spieler der bewegten Figur am Zug?
				if (figur.int_farbe == kint_zugrecht)
				{
					return true;
				}
				else
				{
					return false;
				} 
			}

			function k_feindlich (figur1, figur2)
			{// sind die beiden Figuren Feinde?
				if (figur1.int_farbe == figur2.int_farbe)
				{
					return false;
				}
				else
				{
					return true;
				}
			}
			
			
			function k_zug (figur, feld)
			{
				error_ausgabe("");
				figur.ziehen(feld);
				
				k_bedrohungslage();

			}
				
				
			function k_zugrecht()
			{ //falls weißer Spieler am Zug war, geht Zugrecht an anderen Spieler über und umgekehrt
			if (kint_zugrecht == 0)
			{
				kint_zugrecht = 1;
			}
			else
			{
				kint_zugrecht = 0;
			} 
		}
			
			
			function k_bauerTausch (pobj_figur, pobj_feld)		//Methode die feststellt, ob ein Bauer getauscht werden darf.
			{
			
				if ((pobj_figur.int_feldIndex in {81:1,82:1,83:1,84:1,85:1,86:1,87:1,88:1} || pobj_figur.int_feldIndex < 20) && pobj_figur.cha_typ == "b")
				{
					//alert (pobj_figur.str_id);
					zeigeMeldung(pobj_figur.str_id);
				}
				
			}
			
			
			function Feld(pint_yPos, pint_xPos, pbol_sBed, pbol_wBed, pobj_figur, pint_index)
			{ // Konstruktor für die Felder
				this.obj_figur = pobj_figur;
				this.int_xPos = pint_xPos;
				this.int_yPos = pint_yPos;
				this.bol_sBed = pbol_sBed;
				this.bol_wBed = pbol_wBed;
				this.int_index = pint_index;
			}

			
			
			// ############################### FIGUR-METHODEN################################################
			
			
			function Figur (pstr_id, pint_yPos, pint_xPos, pint_farbe, pcha_typ, pint_feldIndex)
			{ //Konstruktor für die Figuren  (abstrakt)
				this.str_id = pstr_id; // id1k0 referenziert auf den ersten König von Spieler schwarz.
				this.int_xPos = pint_xPos;
				this.int_yPos = pint_yPos;
				this.int_farbe = pint_farbe;
				this.cha_typ = pcha_typ;
				this.int_feldIndex = pint_feldIndex;
				this.bol_aktiv = true;
				this.bol_bewegt = false;	// hat sich die figur bereits bewegt?
				// karr_figuren.length;		// TODO  laufende Nummer wird festgestellt
			
				
				// Instanzmethoden deklarieren
				this.zugPruefen = zugPruefen
				this.entfernen = entfernen
				this.ziehen = ziehen
				this.schlagen = schlagen
				this.bewegen = bewegen
				this.bedrohung = bedrohung
				this.sichtlinie = sichtlinie
			
			}
			
			function zugPruefen(feld)
			{	//wird überschrieben von jeder neuen Figurenunterklasse
							/*var xz feld.int_xPos();
							var yz feld.int_yPos();
							var xq this.int_xPos();
							var yq this.int_yPos();*/
							//rechnen mit den Variablen
			/*	
			
				if(rechenergebnis == gewuenschter Wert)
				{
					if (this.sichtlinie(feld))
					{
						return true;
					}
					else
					{return false;}
				}
				else
				{return false;}
			
			*/
			return true;
			} 
				
			function entfernen()
			{//wird nicht überschrieben
				this.bewegen(karr_felder[89]);
				ausFigur(this);
				this.bol_aktiv = false;
			}
			
			function ziehen(feld) 
			{//TODO  Fehlercodes und historie einbauen !!!
						
				if (Math.abs(this.int_xPos - feld.int_xPos) < 1 || Math.abs(this.int_yPos - feld.int_yPos) < 1)
				{
					
				}
				if (k_farbeAmZug(this) == false)
				{
					error_handling(kint_fehlercode=1);		//#*#
				}
				else
				{
					if (this.zugPruefen(feld) == false) // bei ungültigem Zug wird nichts durchgeführt
					{
						error_handling(kint_fehlercode=2);		//#*#
					}
					else
					{
						if (feld.obj_figur == "")	// bei leerem Zielfeld wird nur bewegt
						{
							this.bewegen(feld);
							k_zugrecht();
						}
						else //bei besetzten Zielfeldern muss zwischen eigenen und feindichen Figuren unterschieden werden
						{
							if (k_feindlich(this, feld.obj_figur) == false) //falls nicht feindlich, ist es ein ungültiger Zug
							{
								error_handling(kint_fehlercode=3);		//#*#
							}
							else //andernfalls wird die Figur auf dem Zielfeld geschlagen
							{
								this.schlagen(feld.obj_figur);
								this.bewegen(feld);
								k_zugrecht();
							}
						}
					}
				}
						
			}
			
			function schlagen(figur)
			{// hier wird überprüft welche Farbe und welcher Typ die Figur ist, dann wird sie entfernt und der richtige Zähler inkrementiert
				
				if (figur.int_farbe == 0)
				{
					switch (figur.cha_typ)
					{
						case "b" :
							karr_zaehler_w[0]++;
						break;
						
						case "l" :
							karr_zaehler_w[1]++;
						break;
						
						case "s" :
							karr_zaehler_w[2]++;
						break;
						
						case "t" :
							karr_zaehler_w[3]++;
						break;
						
						case "d" :
							karr_zaehler_w[4]++;
						break;
						
						case "k" :
							k_schachmatt(0);
						break;
					}
				}
				else
				{
					switch (figur.cha_typ)
						{
							case "b" :
								karr_zaehler_s[0]++;
							break;
							
							case "l" :
								karr_zaehler_s[1]++;
							break;
							
							case "s" :
								karr_zaehler_s[2]++;
							break;
							
							case "t" :
								karr_zaehler_s[3]++;
							break;
							
							case "d" :
								karr_zaehler_s[4]++;
							break;
							
							case "k" :
								k_schachmatt(1);
							break;
						}
				}
				
				figur.entfernen();
			}
			
			function bewegen(feld)
			{// wird nicht überschrieben
				karr_felder[this.int_feldIndex].obj_figur = "";
				this.int_feldIndex = feld.int_index;
				this.int_xPos = feld.int_xPos;
				this.int_yPos = feld.int_yPos;
				feld.obj_figur = this;
				this.bol_bewegt = true;
				
					
				k_bauerTausch(this, feld);
				
			}
			
			function bedrohung()
			{
			for(var i = 0; i < karr_felder.length; i++)
				{
					if (this.zugPruefen(karr_felder[i]) == true)
					{
						if (this.int_farbe == 0)
						{
							karr_felder[i].bol_wBed = true;
						}
						//else
						if (this.int_farbe == 1)
						{
							karr_felder[i].bol_sBed = true;
						}
					}
					else
					{}
				}
				
			}

			function sichtlinie(feld) //diese Funktion prüft, ob der bereits durch zugPrüfen genehmigte Zug überhaupt durchgeführt werden kann
			{//definition von Koordinatendifferenzen und Wegfeldern zwischen Quellfeld und Zielfeld
				var lint_divX = this.int_xPos - feld.int_xPos;
				var lint_divY = this.int_yPos - feld.int_yPos;
				var lint_wegFeld;
				var lint_sichtfrei = 1;
				var lint_feldfrei = 1;
				if (Math.abs(lint_divX) <= 1 && Math.abs(lint_divY) <= 1 )
				{//falls die Figur nur ein Feld weit zieht, werden Zusammenstöße mit anderen Figuren durch function ziehen geregelt
					return true;
				}
				else 
				{//zieht die Figur zwei Felder und mehr, sind Zusammenstöße mit anderen Figuren möglich
					lint_maxDiv = Math.abs(lint_divX); //Variable zur Bestimmung der maximalen Differenz
					if (lint_maxDiv < Math.abs(lint_divY))
					{
						lint_maxDiv = Math.abs(lint_divY);
					} //nach dieser Maßnahme ist lint_maxDiv so groß wie die größere Differenz der beiden Koordinatendifferenzen
					for (var lint_i = 1; lint_i < Math.abs(lint_maxDiv); lint_i ++) //lint_i ist die Zählschleifenvariable. Falls die Figur von Feld 18 nach Feld 38 zieht, gibt es 1 Durchlauf, falls sie von 18 nach 88 zieht, gibt es 6 Durchläufe.
					{//zuerst werden die acht möglichen Richtungen abgeprüft, in die gezogen wird, und absteigend vom Zielfeld bis zum Quellfeld auf "störende" Figuren überprüft
						if (Math.abs(lint_divX) == Math.abs(lint_divY))
						{//diagonale Züge werden hier geregelt
							if(lint_divX < 0 && lint_divY < 0)
							{//erste von vier Diagonal-Richtungen: Es geht zweimal in höhere Koordinaten
								lint_wegFeld = (10 * (this.int_yPos - lint_divY - lint_i)) + (this.int_xPos - lint_divX - lint_i);					
							}
							if(lint_divX > 0 && lint_divY > 0)
							{//zweite von vier Diagonal-Richtungen: Es geht zweimal in niedrigere Koordinaten
								lint_wegFeld = (10 * (this.int_yPos - lint_divY + lint_i)) + (this.int_xPos - lint_divX + lint_i);					
							}
							if(lint_divX > 0 && lint_divY < 0)
							{//dritte von vier Diagonal-Richtungen: niedrigere X-Koordinaten, höhere Y-Koordinaten
								lint_wegFeld = (10 * (this.int_yPos - lint_divY - lint_i)) + (this.int_xPos - lint_divX + lint_i);					
							}
							if(lint_divX < 0 && lint_divY > 0)
							{//vierte von vier Diagonal-Richtungen: höhere X-Koordinaten, niedrigere Y-Koordinaten
								lint_wegFeld = (10 * (this.int_yPos - lint_divY + lint_i)) + (this.int_xPos - lint_divX - lint_i);					
							}
						}//ansonsten ein gerader Zug in vertikaler Richtung
						if (Math.abs(lint_divX) == 0)
						{//es gibt zwei mögliche Richtungen, die gehändelt werden müssen
							if (lint_divY > 1) //muss größer 1 sein, siehe erste IF-Anweisung dieser funktion
							{
								lint_wegFeld = this.int_yPos - lint_divY + lint_i;
								lint_wegFeld = (10 * lint_wegFeld) + (this.int_xPos);
							}//andernfalls ist das divY < -1
							else
							{
								lint_wegFeld = this.int_yPos - lint_divY - lint_i;
								lint_wegFeld = (10 * lint_wegFeld) + (this.int_xPos);
							}
						}//ansonsten ein gerader Zug in horizontaler Richtung
						if (Math.abs(lint_divY) == 0)
						{//es gibt zwei mögliche Richtungen, die gehändelt werden müssen
							if (lint_divX > 1) //muss größer 1 sein, siehe erste IF-Anweisung dieser funktion
							{
								lint_wegFeld = this.int_xPos - lint_divX + lint_i;
								lint_wegFeld = (lint_wegFeld) + (10 * this.int_yPos);
							}//andernfalls ist das divX < 1
							else
							{
								lint_wegFeld = this.int_xPos - lint_divX - lint_i;
								lint_wegFeld = (lint_wegFeld) + (10 * this.int_yPos);
							}
						}// nachdem nun bei jedem Schleifendurchlauf das zutreffende Feld in jeder der acht Richtungen in wegFeld geschrieben wurde, wird in der if-Bedingung abgeprüft:
						
						
						for (var lint_j = 0; lint_j < karr_figuren.length; lint_j++)
						{
							if (karr_figuren[lint_j].int_feldIndex == lint_wegFeld)	
							{//wenn sich eine der Figuren im Array auf dem Feld befindet, ist das Feld nicht frei
								lint_feldfrei = 0;
							}
						}

						//nur ein besetztes Feld zwischen Quellfeld und Zielfeld bedeutet, dass keine freie Sicht herrscht: true * false = false. Nur wenn feldfrei immer true geblieben ist, wird am Ende true zurückgegeben
						lint_sichtfrei = lint_sichtfrei * lint_feldfrei;
						
			//			if (kbol_inBedrohungslage == false)
			//				{
			//					alert("" + karr_felder[lint_wegFeld].figur);
			//				}
						
					}//end for           // TODO: Ausgabe der Zwischenergebnisse zur Überprüfung nötig???
					if (lint_sichtfrei == 1)
					{
						return true;
					}
					else
					{
						return false;
					}
				}//end else
			
	
				return true;   //Test
			}//end function

			
			
		// ####################################################################################
		// ZugPruefen-Methoden der Figuren
		function zugPruefenLaeufer(feld)
		{	
			var difX = this.int_xPos - feld.int_xPos;
			var difY = this.int_yPos - feld.int_yPos;
	
			if (Math.abs(difX) == Math.abs(difY))
			{
				if (this.sichtlinie(feld))
				{
					return true;
				}
				else
				{
					return false;
				}
			}
			else
			{
				return false;
			}
		} 
		
		
		function zugPruefenSpringer(feld)
		{	

			var difX = this.int_xPos - feld.int_xPos;
			var difY = this.int_yPos - feld.int_yPos;

			if (((Math.abs(difX) == 1) && (Math.abs(difY) == 2)) || ((Math.abs(difY) == 1) && (Math.abs(difX) == 2)))

			{
				return true;
			}
				
			else
			{
				return false;
			}
		} 
		
		
		function zugPruefenTurm(feld)
		{
		  var difX = this.int_xPos - feld.int_xPos      //Differenz in X-Richtung
		  var difY = this.int_yPos - feld.int_yPos      //Differenz in Y-Richtung

		  if ((Math.abs(difX) == 0) || (Math.abs(difY) == 0))
		  //Bei der Bewegung des Turmes muss entweder X oder Y null sein. Ist eins davon null, wird true übermittelt. 
		  //Sind beide ungleich null wird fals übermittelt
		  //Sind beide Werte null wird auch null übermittelt, da dann der Turm auf seiner derzeitigen Stelle bleibt
		  //und dies auch keinen Fehler darstellt.
		  
		    { if (this.sichtlinie(feld) == true)
		      { return true;
			  }
			  else
			  { return false;
			  }
		    }  
		}
		
		
		function zugPruefenDame(feld)
		{
		  var difX = this.int_xPos - feld.int_xPos      //Differenz in X-Richtung
		  var difY = this.int_yPos - feld.int_yPos      //Differenz in Y-Richtung

		  if (((Math.abs(difX) == 0) || (Math.abs(difY) == 0)) || (Math.abs(difX) == Math.abs(difY)))
		  //Die der Bewegung der Dame leitet sich aus den Bewegungen des Turmes und des Läufers ab.
		  //Sie darf entweder in X- oder Y-Richtung ohne "Einschränkung" laufen oder auf den Diagonalen (entsprechenden 
		  //der Läuferbewegung)
		  
		    { if (this.sichtlinie(feld) == true)
		      { return true;
			  }
			  else
			  { return false;
			  }
		    }  
		}
		
		
	
	function zugPruefenKoenig(feld)
	{	
		var difX = this.int_xPos - feld.int_xPos;
		var difY = this.int_yPos - feld.int_yPos;
		
		
		if ((Math.abs(difX) <= 1) && (Math.abs(difY) <= 1))
		{	
			if (this.int_farbe == 0)
			{
				if (feld.bol_sBed == false)
				{
					return true;
				}
				else
				{
					return false;
				}
			}
			if (this.int_farbe == 1)
			{
				if (feld.bol_wBed == false)
				{
					return true;
				}
				else
				{
					return false;
				}
			}
		}
		else
		{ //prüfen auf Rochademöglichkeit
			
			//will der König auf das Feld 13, 17. 83, 87?
			if ((feld == karr_felder[ 13 ]) || (feld == karr_felder[ 17 ]) || (feld == karr_felder[ 83 ]) || (feld == karr_felder[ 87 ]))
			{			
				//Hat sich der König schon bewegt ?
				if (this.bol_bewegt == true)
				{
					return false;
				}
				
					// Sind die Felder besetzt?
					// zu überprüfende Felder: (12, 13, 14) für links (16, 17) für rechts (weiß)
					if ((((this.int_farbe == 0) && (feld == karr_felder[ 13 ]) && (karr_felder[ 12 ].figur != "") && (karr_felder[ 13 ].figur != "") && (karr_felder[ 14 ].figur != "")) 
					|| ((this.int_farbe == 0) && (feld == karr_felder[ 17 ]) && (karr_felder[ 16 ].figur != "") && (karr_felder[ 17 ].figur != "")))

					||
					// zu überprüfende Felder: (82, 83, 84) für rechts (86, 87) für links (schwarz)
					(((this.int_farbe == 1) && (feld == karr_felder[ 83 ]) && (karr_felder[ 82 ].figur != "") && (karr_felder[ 83 ].figur != "") && (karr_felder[ 84 ].figur != "")) 
					|| ((this.int_farbe == 1) && (feld == karr_felder[ 87 ]) && (karr_felder[ 86 ].figur != "") && (karr_felder[ 87 ].figur != ""))))
					{
					
									
					//  Prüfen, ob sich der entsprechende Turm schon bewegt hat
							switch (feld.int_index)
									{
										case 13: //linken weißen Turm auf Feld 14
										if (karr_figuren[12].bol_bewegt == true)
										{return false;}
										break;
										
										case 17: //rechten weißen Turm auf Feld 16
										if (karr_figuren[13].bol_bewegt == true)
										{return false;}
										break;
										
										case 83: //linken schwarzen Turm auf Feld 84
										if (karr_figuren[27].bol_bewegt == true)
										{return false;}
										break;
										
										case 87: //rechten schwarzen Turm auf Feld 86
										if (karr_figuren[28].bol_bewegt == true)
										{return false;}
										break;
										
									}
							
							
							
							
					// Prüfen ob die Wegfelder des Königs bedroht sind
					
						// zu überprüfende Felder: (13,14,15) für links (15, 16, 17) für rechts (weiß)
						// zu überprüfende Felder: (83,84,85) für links (85, 86, 87) für rechts (schwarz)
							
							switch (feld.int_index)
									{
										case 13: 
										if (karr_felder[13].bol_sBed == true)
										{return false;}
										if (karr_felder[14].bol_sBed == true)
										{return false;}
										if (karr_felder[15].bol_sBed == true)
										{return false;}
										break;
										
										case 17: 
										if (karr_felder[15].bol_sBed == true)
										{return false;}
										if (karr_felder[16].bol_sBed == true)
										{return false;}
										if (karr_felder[17].bol_sBed == true)
										{return false;}
										break;
										
										case 83: 
										if (karr_felder[83].bol_wBed == true)
										{return false;}
										if (karr_felder[84].bol_wBed == true)
										{return false;}
										if (karr_felder[85].bol_wBed == true)
										{return false;}
										break;
										
										case 87: 
										if (karr_felder[85].bol_wBed == true)
										{return false;}
										if (karr_felder[86].bol_wBed == true)
										{return false;}
										if (karr_felder[87].bol_wBed == true)
										{return false;}
										break;
										
									}
						
								if (kbol_inBedrohungslage == false)
								{
					// Wenn alles gutging, wird der entsprechende Turm bewegt.		
							switch (feld.int_index)
									{
										case 13: //linken weißen Turm auf Feld 14
										karr_figuren[12].bewegen(karr_felder[14]);
										break;
										
										case 17: //rechten weißen Turm auf Feld 16
										karr_figuren[13].bewegen(karr_felder[16]);
										break;
										
										case 83: //linken schwarzen Turm auf Feld 84
										karr_figuren[27].bewegen(karr_felder[84]);
										break;
										
										case 87: //rechten schwarzen Turm auf Feld 86
										karr_figuren[28].bewegen(karr_felder[86]);
										break;
										
									}
								}
					
					}
					else
					{
						return false;
					}

									
			
			}
			else
			{
				return false;
			}
			
		}
	} 
	
	
	function zugPruefenBauer(feld)
	{	//wird überschrieben von jeder neuen Figurenunterklasse
		//hier am Beispiel Bauer

		// In X-Richtung interessiert uns nur der Betrag der Differez
		var difX = Math.abs(this.int_xPos - feld.int_xPos);
		//var difY = this.int_xPos - feld.int_xPos;

		// Zug in Y-Richtung darf nur eine positive Differenz sein (in Richtung Gegner)
		// Weiss ist 0, Schwarz ist 1
		var difY = feld.int_yPos - this.int_yPos;
		// Bei Farbe Schwarz geht der Zug in Richtung der niederwertigen Indizes

		if (this.int_farbe == 1)
		{
			difY = -1 * difY;
		}

		// Falls Zug in falsche Richtung oder auf gleicher Y-Höhe, Zug ablehnen
		if (difY < 1)
		{
			return false;
		}

		//Eröffnungszug:  2 Felder nach vorn nur beim ersten Zug erlaubt und nicht schraeg
		if (difY == 2 && difX == 0)
		{
			if (this.bol_bewegt == true)
			{
				return false;
			}
			else
			{ // Jetzt muss nur noch ueberprueft werden, ob was im Weg steht
				if (this.sichtlinie(feld) == false)
				{
					return false;
				}
			}
				//hat doppelzug gemacht
				if (difY == 2)
				{

					if(kbol_inBedrohungslage == false)
					{
						this.bol_doppelzug = true;
					}

					return true;
				}
		}

		// Mehr als 2 Felder darf ein Bauer nie in Y-Richtung ziehen
		if (difY > 2)
		{
			return false;
		}

		//Normaler Zug: In X-Richtung darf maximal eine Differenz von einem Feld auftreten
		if (difY == 1)
		{//hier wird jetzt der schräge Zug geprüft
			if(difX == 1)
			{
				if (feld.obj_figur != "")
				{
					if (k_feindlich(this, feld.obj_figur) == true) 
					{
							return true;
					}
					else
					{//falls nicht feindlich, ist es ein ungültiger Zug
						return false;
					}
				}

				else
				{//falls nicht besetzt ist es ungültiger Zug
					//es sei denn, es ist ein en-passant-schlagen möglich
	/*				if (
							feld.obj_figur == "" && this.int_farbe == 1 && this.int_yPos == 4 
							|| 
							feld.obj_figur == "" && this.int_farbe == 0 && this.int_yPos == 5
						)
					{	
						if
						(
							(
								k_feindlich(this, karr_felder[this.int_xPos+1].obj_figur) == true
								&&
								karr_felder[this.int_xPos+1].figur.bol_doppelzug == true
								&&
								feld.int_xPos == this.int_xPos+1
							)
						||
							(
								k_feindlich(this, karr_felder[this.int_xPos-1].obj_figur) == true
								&&
								karr_felder[this.int_xPos-1].figur.bol_doppelzug == true
								&&
								feld.int_xPos == this.int_xPos-1
							)
						)
						{
							return true;
						}
					}
					else
					{ 						*/
						return false;
					//}
					
				}

			}
			else
			{
				if(difX == 0)
				{
					//abprüfen, ob Feld leer ist, wenn ja, darf man hinziehen
					if (feld.obj_figur == "")	// bei leerem Zielfeld wird nur bewegt
					{
						return true;
					}
					else
					{
						return false;
					}
				}
				else
				{
					return false;
				}
			}
		}
		else
		{
			return false;
		}
		
			
	}
		
		// ####################################################################################
		
		
		function Nix (pstr_id, pint_xPos, pint_yPos, pint_farbe, pcha_typ, pint_feldIndex)
		{
			this.constructor(pstr_id, pint_xPos, pint_yPos, pint_farbe, pcha_typ, pint_feldIndex);
		}
		Nix.prototype = new Figur();

		
		function Bauer (pstr_id, pint_xPos, pint_yPos, pint_farbe, pcha_typ, pint_feldIndex)
		{
			this.constructor(pstr_id, pint_xPos, pint_yPos, pint_farbe, pcha_typ, pint_feldIndex);
			this.zugPruefen = zugPruefenBauer
			this.bol_doppelzug = false;
		}
		Bauer.prototype = new Figur();
		
		
		function Laeufer (pstr_id, pint_xPos, pint_yPos, pint_farbe, pcha_typ, pint_feldIndex)
		{
			this.constructor(pstr_id, pint_xPos, pint_yPos, pint_farbe, pcha_typ, pint_feldIndex);
			this.zugPruefen = zugPruefenLaeufer
		}
		Laeufer.prototype = new Figur();
		
		
		function Springer (pstr_id, pint_xPos, pint_yPos, pint_farbe, pcha_typ, pint_feldIndex)
		{
			this.constructor(pstr_id, pint_xPos, pint_yPos, pint_farbe, pcha_typ, pint_feldIndex);
			this.zugPruefen = zugPruefenSpringer
		}
		Springer.prototype = new Figur();
		
		
		function Turm (pstr_id, pint_xPos, pint_yPos, pint_farbe, pcha_typ, pint_feldIndex)
		{
			this.constructor(pstr_id, pint_xPos, pint_yPos, pint_farbe, pcha_typ, pint_feldIndex);
			this.zugPruefen = zugPruefenTurm
		}
		Turm.prototype = new Figur();
		
		
		function Dame (pstr_id, pint_xPos, pint_yPos, pint_farbe, pcha_typ, pint_feldIndex)
		{
			this.constructor(pstr_id, pint_xPos, pint_yPos, pint_farbe, pcha_typ, pint_feldIndex);
			this.zugPruefen = zugPruefenDame
		}
		Dame.prototype = new Figur();
		
		
		function Koenig (pstr_id, pint_xPos, pint_yPos, pint_farbe, pcha_typ, pint_feldIndex)
		{
			this.constructor(pstr_id, pint_xPos, pint_yPos, pint_farbe, pcha_typ, pint_feldIndex);
			this.zugPruefen = zugPruefenKoenig
		}
		Koenig.prototype = new Figur();

		//reminder: A1 = 11; F2 = 26; B7 = 72
		// reminder: karr_felder[11] = a1;

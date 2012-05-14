// gui.js beinhaltet alle Objekte, die für die grafische Benutzeroberfläche und Grafikanbindung notwendig sind


/****************
* Hilfsmethoden *
*****************/

// gibt die absoluten Pixelkoordinaten der linken oberen Ecke des übergebenen Objekts als Array zurück
function findePos (pobj_Objekt)
{
    this.obj_Objekt = pobj_Objekt;
    var int_x = int_y = 0;

    // falls das Objekt ein übergeordnetes Objekt hat
    if (obj_Objekt.offsetParent)
    {
        // durchläuft alle übergeordneten Objekte und summiert x- und y-Abstände
        do
        {
            int_x += obj_Objekt.offsetLeft;
            int_y += obj_Objekt.offsetTop;
        }
        while (obj_Objekt = obj_Objekt.offsetParent);
    }
    return [int_x,int_y];
} // Ende findePos


// gibt ein Array mit allen HTML-Elementen der übergebenen CSS-Klassenzugehörigkeit zurück
function getElementsByClass (pstr_klasse)
{
    this.str_klasse = pstr_klasse;
    var arr_klassen = new Array ();
    var arr_tags = document.getElementsByTagName("*"); // Array mit allen Tags

    for (var i = 0; i < arr_tags.length; i++)
    {
        if (arr_tags[i].className == str_klasse)
            arr_klassen.push(arr_tags[i]);
    }

    return arr_klassen;
} // Ende getElementsByClass


// gibt das JavaScript-Figur-Objekt mit der übergebenen ID zurück
function getFigurById (pstr_id)
{
    this.str_id = pstr_id;

    for (var i = 0; i < karr_figuren.length; i++)
    {
        var figur = karr_figuren[i];
        if (figur.str_id == str_id)
            return figur;
    }
} // Ende getFigurById


// löscht alle HTML-Kindelemente des HTML-Elements mit der übergebenen CSS-ID
function removeChildren (pstr_id)
{
    this.str_id = pstr_id;
    var node = document.getElementById(str_id);

    if (node.hasChildNodes())
    {
        while (node.childNodes.length >= 1 )
            node.removeChild(node.firstChild);
    }
} // Ende removeChildren



/******************
* GUI (allgemein) *
*******************/

// für alle Fieldsets den Zustand "zugeklappt" setzen
kbol_aus_s = 0;
kbol_aus_w = 0;
kbol_spielverlauf = 0;


// ändert die CSS-Klasse des übergeordneten Fieldsets des HTML-Elements mit der übergebenen CSS-ID
function fieldsetSchalter (pstr_id)
{
    this.str_id = pstr_id;
    var str_fieldset_id = "fieldset_"+str_id;
    var obj_fieldset = document.getElementById(str_fieldset_id);

    if (window["kbol_" + str_id])
    {
        obj_fieldset.className = "zugeklappt";
        window["kbol_" + str_id]  = 0;
    }
    else
    {
        obj_fieldset.className = "aufgeklappt";
        window["kbol_" + str_id] = 1;
    }
} // Ende fieldsetSchalter


// ändert das CSS-Stylesheet
function switchStyle (pstr_title)
{
    this.str_title = pstr_title;
    var arr_links = document.getElementsByTagName("link"); // Array mit allen <link>-Tags

    for (var i = 0; i < arr_links.length; i++)
    {
        // auf Existenz der Eigenschaft "title" prüfen (damit Standard-Stylesheet nicht deaktiviert wird)
        if (arr_links[i].getAttribute("title"))
        {
            // aktuelles <link>-Tag auf jeden Fall deaktivieren
            arr_links[i].disabled = true;
            // falls Wert der Eigenschaft "title" mit Auswahl übereinstimmt: deaktivieren rückgängig
            // (so bleibt das nicht gewählte Stylesheet in jedem Fall deaktiviert)
            if (arr_links[i].getAttribute("title") == str_title)
                arr_links[i].disabled = false;
        }
    }
} // Ende switchStyle



/**************
* GUI (Spiel) *
***************/

// Spielende
k_spielende = 0;

// Bauer, der die gegnerische Grundlinie erreicht hat
k_tauschbauer = null;


function error_ausgabe(pstr_meldungsText)
{
	document.getElementById("error_box").firstChild.data = pstr_meldungsText;
}


// fügt für jede geschlagene Figur ein "div"-HTML-Element innerhalb des Fieldsets "aus_s/w" hinzu
function ausFigur (pobj_figur)
{
    this.obj_figur = pobj_figur;
    var int_farbe, int_typ;

    int_farbe = obj_figur.str_id.substr(2,1);

    switch (obj_figur.cha_typ)
    {
        case "b" :
            int_typ = 0;
        break;
        case "l" :
            int_typ = 1;
        break;
        case "s" :
            int_typ = 2;
        break;
        case "t" :
            int_typ = 3;
        break;
        case "d" :
            int_typ = 4;
        break;
        case "k" :
            int_typ = 5;
            k_spielende = 1;
        break;
    }

    // Figur aus HTML löschen
    document.getElementById("figuren").removeChild(document.getElementById(obj_figur.str_id));

    if (int_farbe == 0)
    {
        if ((karr_zaehler_w[int_typ] == 1) || (int_typ == 5))
        {
            var obj_divFigur = document.createElement("div");

            // einen leeren Textknoten für den Zähler der Figur erstellen
            var obj_divText = document.createTextNode(" ");
            obj_divFigur.appendChild(obj_divText);

            // ein class-Attribut für die Zuordnung der korrekten Grafik via CSS erstellen
            var obj_divClass = document.createAttribute("class");
            obj_divClass.nodeValue = "ausfigur typ" + obj_figur.cha_typ.toString() + int_farbe;

            // ein id-Attribut mit dem Typ der Figur als Inhalt erstellen
            var obj_divId = document.createAttribute("id");
            obj_divId.nodeValue = "typ" + obj_figur.cha_typ.toString() + int_farbe;

            // erstellte Attribute an den neuen div-Container übergeben
            obj_divFigur.setAttributeNode(obj_divClass);
            obj_divFigur.setAttributeNode(obj_divId);
            document.getElementById("aus_s").appendChild(obj_divFigur);

            if (kbol_aus_s == 0)
                fieldsetSchalter("aus_s");
        }
        else
            document.getElementById("typ" + obj_figur.cha_typ.toString() + int_farbe).firstChild.data = karr_zaehler_w[int_typ];
    }
    else
    {
        if ((karr_zaehler_s[int_typ] == 1) || (int_typ == 5))
        {
            var obj_divFigur = document.createElement("div");

            // einen leeren Textknoten für den Zähler der Figur erstellen
            var obj_divText = document.createTextNode(" ");
            obj_divFigur.appendChild(obj_divText);

            // ein class-Attribut für die Zuordnung der korrekten Grafik via CSS erstellen
            var obj_divClass = document.createAttribute("class");
            obj_divClass.nodeValue = "ausfigur typ" + obj_figur.cha_typ.toString() + int_farbe;

            // ein id-Attribut mit dem Typ der Figur als Inhalt erstellen
            var obj_divId = document.createAttribute("id");
            obj_divId.nodeValue = "typ" + obj_figur.cha_typ.toString() + int_farbe;

            // erstellte Attribute an den neuen div-Container übergeben
            obj_divFigur.setAttributeNode(obj_divClass);
            obj_divFigur.setAttributeNode(obj_divId);
            document.getElementById("aus_w").appendChild(obj_divFigur);

            if (kbol_aus_w == 0)
                fieldsetSchalter("aus_w");
        }
        else
            document.getElementById("typ" + obj_figur.cha_typ.toString() + int_farbe).firstChild.data = karr_zaehler_s[int_typ];
    }
} // Ende ausFigur



// ändert den textlichen Hinweis im HTML auf den aktuellen letzten Zug
function letzterZug (pstr_wert)
{
    this.str_wert = pstr_wert;
    var int_laenge = document.getElementById("letzterzug").firstChild.nodeValue.length;

    document.getElementById("letzterzug").firstChild.deleteData(0, int_laenge);
    document.getElementById("letzterzug").firstChild.appendData(str_wert);
} // Ende letzterZug


// löscht alle Figuren im HTML
function loescheFiguren (karr_figuren)
{
    // geschlagene Figuren löschen
    removeChildren("aus_s");
    removeChildren("aus_w");

    // Figuren auf Schachbrett löschen
    removeChildren("figuren");
} // Ende loescheFiguren


// initialisiert ein neues Spiel
function neuesSpiel ()
{
    loescheFiguren(karr_figuren);
    if (kbol_aus_s)
        fieldsetSchalter("aus_s");
    if (kbol_aus_w)
        fieldsetSchalter("aus_w");
    letzterZug("leer");
    k_initialisierung();
    zugrechtSwitch();
} // Ende neuesSpiel


// fügt für jedes JavaScript-Figur-Objekt ein "div"-HTML-Element innerhalb des "div"-HTML-Elements "figuren" hinzu
function setzeFiguren (karr_figuren)
{
    for (var i = 0; i < karr_figuren.length; i++)
    {
        var obj_figur = karr_figuren[i];
        var obj_divFigur = document.createElement("div");

        // ein id-Attribut mit der Figur-ID als Inhalt erstellen
        var obj_divId = document.createAttribute("id");
        obj_divId.nodeValue = obj_figur.str_id;

        // ein class-Attribut für die Zuordnung der korrekten Grafik via CSS erstellen
        var obj_divClass = document.createAttribute("class");
        obj_divClass.nodeValue = "figur typ" + obj_figur.cha_typ + obj_figur.int_farbe;

        // ein onmousedown-Attribut erstellen, das den Event-Handler für das Drag-and-Drop setzt
        var obj_divEvent = document.createAttribute("onmousedown");
        obj_divEvent.nodeValue = "dragStart(this)";

        // ein style-Attribut mit "position" als Inhalt erstellen
        var obj_divStyle = document.createAttribute("style");
        var str_top = 348 - obj_figur.int_yPos * 40;
        var str_left = -14 + obj_figur.int_xPos * 40;
        var str_position = "top: " + str_top + "px; left: " + str_left + "px";
        obj_divStyle.nodeValue = str_position;

        // erstellte Attribute an den neuen div-Container übergeben
        obj_divFigur.setAttributeNode(obj_divId);
        obj_divFigur.setAttributeNode(obj_divClass);
        obj_divFigur.setAttributeNode(obj_divEvent);
        obj_divFigur.setAttributeNode(obj_divStyle);

        document.getElementById("figuren").appendChild(obj_divFigur);
    }
} // Ende setzeFiguren


// tauscht einen Bauern gegen einen Offizier aus
function tauscheFigur (pcha_typ)
{
    this.cha_typ = pcha_typ;
    var int_farbe = parseInt(k_tauschbauer.substr(2,1));

    // ID für den neuen Offizier ermitteln
    var str_id = k_berechneID(cha_typ, int_farbe);

    // neues HTML-Element erstellen
    var obj_divFigur = document.createElement("div");

    // ein id-Attribut mit der neuen ID als Inhalt erstellen
    var obj_divId = document.createAttribute("id");
    obj_divId.nodeValue = str_id;

    // ein class-Attribut für die Zuordnung der korrekten Grafik via CSS erstellen
    var obj_divClass = document.createAttribute("class");
    obj_divClass.nodeValue = "figur typ" + cha_typ.toString() + int_farbe.toString();

    // ein onmousedown-Attribut erstellen, das den Event-Handler für das Drag-and-Drop setzt
    var obj_divEvent = document.createAttribute("onmousedown");
    obj_divEvent.nodeValue = "dragStart(this)";

    // ein style-Attribut mit "position" als Inhalt erstellen
    var obj_divStyle = document.createAttribute("style");
    var str_top = 348 - karr_figuren[k_getFigurIndex(k_tauschbauer)].int_yPos * 40;
    var str_left = -14 + karr_figuren[k_getFigurIndex(k_tauschbauer)].int_xPos * 40;
    var str_position = "top: " + str_top + "px; left: " + str_left + "px; cursor: default";
    obj_divStyle.nodeValue = str_position;

    // erstellte Attribute an den neuen div-Container übergeben
    obj_divFigur.setAttributeNode(obj_divId);
    obj_divFigur.setAttributeNode(obj_divClass);
    obj_divFigur.setAttributeNode(obj_divEvent);
    obj_divFigur.setAttributeNode(obj_divStyle);

    // alten Bauern aus HTML löschen
    document.getElementById("figuren").removeChild(document.getElementById(k_tauschbauer));

    // neuen Offizier im HTML hinzufügen
    document.getElementById("figuren").appendChild(obj_divFigur);

    // Container für transparenten Hintergrund der Meldung verstecken
    document.getElementById("overlay").style.display = "none";

    // je nach Farbe und Typ des gewählten Offiziers ein neues Objekt instanziieren
    if (int_farbe == 0)
    {
        switch (cha_typ)
        {
            case "l" :
                window[str_id] = new Laeufer(str_id,getFigurById(k_tauschbauer).int_yPos,getFigurById(k_tauschbauer).int_xPos,0,"l",getFigurById(k_tauschbauer).int_yPos.toString() + getFigurById(k_tauschbauer).int_xPos.toString());
                karr_figuren[k_getFigurIndex(k_tauschbauer)] = window[str_id];
            break;

            case "s" :
                window[str_id] = new Springer(str_id,getFigurById(k_tauschbauer).int_yPos,getFigurById(k_tauschbauer).int_xPos,0,"s",getFigurById(k_tauschbauer).int_yPos.toString() + getFigurById(k_tauschbauer).int_xPos.toString());
                karr_figuren[k_getFigurIndex(k_tauschbauer)] = window[str_id];
            break;

            case "t" :
                window[str_id] = new Turm(str_id,getFigurById(k_tauschbauer).int_yPos,getFigurById(k_tauschbauer).int_xPos,0,"t",getFigurById(k_tauschbauer).int_yPos.toString() + getFigurById(k_tauschbauer).int_xPos.toString());
                karr_figuren[k_getFigurIndex(k_tauschbauer)] = window[str_id];
            break;

            case "d" :
                window[str_id] = new Dame(str_id,getFigurById(k_tauschbauer).int_yPos,getFigurById(k_tauschbauer).int_xPos,0,"d",getFigurById(k_tauschbauer).int_yPos.toString() + getFigurById(k_tauschbauer).int_xPos.toString());
                karr_figuren[k_getFigurIndex(k_tauschbauer)] = window[str_id];
            break;
        }
    }
    else
    {
        switch (cha_typ)
        {
            case "l" :
                window[str_id] = new Laeufer(str_id,getFigurById(k_tauschbauer).int_yPos,getFigurById(k_tauschbauer).int_xPos,1,"l",getFigurById(k_tauschbauer).int_yPos.toString() + getFigurById(k_tauschbauer).int_xPos.toString());
                karr_figuren[k_getFigurIndex(k_tauschbauer)] = window[str_id];
            break;

            case "s" :
                window[str_id] = new Springer(str_id,getFigurById(k_tauschbauer).int_yPos,getFigurById(k_tauschbauer).int_xPos,1,"s",getFigurById(k_tauschbauer).int_yPos.toString() + getFigurById(k_tauschbauer).int_xPos.toString());
                karr_figuren[k_getFigurIndex(k_tauschbauer)] = window[str_id];
            break;

            case "t" :
                window[str_id] = new Turm(str_id,getFigurById(k_tauschbauer).int_yPos,getFigurById(k_tauschbauer).int_xPos,1,"t",getFigurById(k_tauschbauer).int_yPos.toString() + getFigurById(k_tauschbauer).int_xPos.toString());
                karr_figuren[k_getFigurIndex(k_tauschbauer)] = window[str_id];
            break;

            case "d" :
                window[str_id] = new Dame(str_id,getFigurById(k_tauschbauer).int_yPos,getFigurById(k_tauschbauer).int_xPos,1,"d",getFigurById(k_tauschbauer).int_yPos.toString() + getFigurById(k_tauschbauer).int_xPos.toString());
                karr_figuren[k_getFigurIndex(k_tauschbauer)] = window[str_id];
            break;
        }
    }

    // Bedrohungslage aktualisieren
    k_bedrohungslage();
} // Ende tauscheFigur


// verschiebt eine Figur im HTML
function verschiebeFigur (pobj_figur, pobj_feld)
{
    if (k_spielende == 0)
    {
        this.obj_figur = pobj_figur;
        this.obj_feld = pobj_feld;

        // zu verschiebende Figur und Zielfeld im HTML identifizieren
        var obj_verschObj = document.getElementById(obj_figur.str_id);
        var obj_zielFeld = document.getElementById("id" + obj_feld.int_yPos.toString() + obj_feld.int_xPos);

        // zu verschiebende im HTML Figur verschieben
        obj_verschObj.style.left = -14 + obj_feld.int_xPos * 40 + "px";
        obj_verschObj.style.top = 348 - obj_feld.int_yPos * 40 + "px";

        // textlichen Hinweis im HTML auf das aktuelle Zugrecht ändern und korrekte CSS-Pointer setzen
        zugrechtSwitch();

        // textlichen Hinweis im HTML auf den aktuellen (= letzten) Zug ändern
        if (karr_historie[karr_historie.length - 1] != null)
            letzterZug(karr_historie[karr_historie.length - 1].replace(/;/g, ""));
    }
} // Ende verschiebeFigur


// zeigt Meldung für Offiziersauswahl
function zeigeMeldung (pstr_id)
{
    if (k_spielende == 0)
    {
        this.str_id = pstr_id;
        k_tauschbauer = str_id;
        var int_farbe = str_id.substr(2,1);

        // Container für transparenten Hintergrund der Meldung anzeigen
        document.getElementById("overlay").style.display = "block";

        // je nach Farbe des Bauers die entsprechende Meldung anzeigen
        if (int_farbe == 0)
        {
            document.getElementById("meldung_w").style.display = "block";
            document.getElementById("meldung_s").style.display = "none";
        }
        else
        {
            document.getElementById("meldung_s").style.display = "block";
            document.getElementById("meldung_w").style.display = "none";
        }
    }
} // Ende zeigeMeldung


// behandelt die Änderung des Zugrechts
function zugrechtSwitch ()
{
    if (k_spielende == 0)
    {
        if (kint_zugrecht)
        {
            var int_farbe = 0;

            // textlichen Hinweis im HTML auf das aktuelle Zugrecht setzten
            document.getElementById("zugrecht").firstChild.data = "Schwarz am Zug";
        }
        else
        {
            var int_farbe = 1;

            // textlichen Hinweis im HTML auf das aktuelle Zugrecht setzten
            document.getElementById("zugrecht").firstChild.data = "Weiß am Zug";
        }
        // CSS-Cursor korrekt setzten
        var arr_bauern = getElementsByClass("figur typb" + int_farbe);
        var arr_laeufer = getElementsByClass("figur typl" + int_farbe);
        var arr_springer = getElementsByClass("figur typs" + int_farbe);
        var arr_tuerme = getElementsByClass("figur typt" + int_farbe);
        var arr_damen = getElementsByClass("figur typd" + int_farbe);
        for (var i = 0; i < arr_bauern.length; i++)
            arr_bauern[i].style.cursor = "default";
        for (var i = 0; i < arr_laeufer.length; i++)
            arr_laeufer[i].style.cursor = "default";
        for (var i = 0; i < arr_springer.length; i++)
            arr_springer[i].style.cursor = "default";
        for (var i = 0; i < arr_tuerme.length; i++)
            arr_tuerme[i].style.cursor = "default";
        for (var i = 0; i < arr_damen.length; i++)
            arr_damen[i].style.cursor = "default";
        document.getElementById("id" + int_farbe.toString() + "k0").style.cursor = "default";

        arr_bauern = getElementsByClass("figur typb" + kint_zugrecht);
        arr_laeufer = getElementsByClass("figur typl" + kint_zugrecht);
        arr_springer = getElementsByClass("figur typs" + kint_zugrecht);
        arr_tuerme = getElementsByClass("figur typt" + kint_zugrecht);
        arr_damen = getElementsByClass("figur typd" + kint_zugrecht);
        for (var i = 0; i < arr_bauern.length; i++)
            arr_bauern[i].style.cursor = "pointer";
        for (var i = 0; i < arr_laeufer.length; i++)
            arr_laeufer[i].style.cursor = "pointer";
        for (var i = 0; i < arr_springer.length; i++)
            arr_springer[i].style.cursor = "pointer";
        for (var i = 0; i < arr_tuerme.length; i++)
            arr_tuerme[i].style.cursor = "pointer";
        for (var i = 0; i < arr_damen.length; i++)
            arr_damen[i].style.cursor = "pointer";
        document.getElementById("id" + int_farbe.toString() + "k0").style.cursor = "pointer";
    }
    else
    {
        if (kint_zugrecht)
            var int_farbe = 0;
        else
            var int_farbe = 1;

        // CSS-Cursor korrekt setzten
        var arr_bauern = getElementsByClass("figur typb" + int_farbe);
        var arr_laeufer = getElementsByClass("figur typl" + int_farbe);
        var arr_springer = getElementsByClass("figur typs" + int_farbe);
        var arr_tuerme = getElementsByClass("figur typt" + int_farbe);
        var arr_damen = getElementsByClass("figur typd" + int_farbe);
        for (var i = 0; i < arr_bauern.length; i++)
            arr_bauern[i].style.cursor = "default";
        for (var i = 0; i < arr_laeufer.length; i++)
            arr_laeufer[i].style.cursor = "default";
        for (var i = 0; i < arr_springer.length; i++)
            arr_springer[i].style.cursor = "default";
        for (var i = 0; i < arr_tuerme.length; i++)
            arr_tuerme[i].style.cursor = "default";
        for (var i = 0; i < arr_damen.length; i++)
            arr_damen[i].style.cursor = "default";
        document.getElementById("id" + int_farbe.toString() + "k0").style.cursor = "default";

        // textlichen Hinweis im HTML auf Spielende geben
        document.getElementById("zugrecht").firstChild.data = "Spielende";
    }
} // Ende zugrechtSwitch



/****************
* Drag-and-Drop *
****************/

// Objekt, das gerade bewegt wird [verwendet in: dragStart, drag, drop]
obj_dragObj = null;

// Pixelkoordinaten der Maus [verwendet in: dragStart, drag]
int_MausX = int_MausY = 0;

// Pixelkoordinaten der Position, an der das Objekt angeklickt wurde, relativ zum übergeordneten Objekt [verwendet in: dragStart, drag]
int_dragObjKlickX = int_dragObjKlickY = 0;

// Pixelkoordinaten der Mitte des angeklickten Objekts, einmalig berechnet bei Anklicken [verwendet in: dragStart, drag]
int_dragObjMitteX = int_dragObjMitteY = 0;

// Differenz in Pixelkoordinaten berechnen zwischen der Mausposition und der Mitte des angeklickten Objekts, einmalig berechnet bei Anklicken [verwendet in: dragStart, drag]
int_diffMausObjMitteX = int_diffMausObjMitteY = 0;

// Pixelkoordinaten der linken oberen Ecke des Schachbrettes [verwendet in: dragStart, drag]
int_brettX = int_brettY = 0;

// Differenz zwischen Mitte des angeklickten Objekts und aktueller Mausposition in Pixel [verwendet in: drag, drop]
int_diffX = int_diffY = 0;

// Hilfsvariablen zur Feststellung, ob sich die Maus außerhalb des Schachbretts befindet [verwendet in: drag, drop]
bol_rausX = bol_rausY = false;


// initialisiert Überwachung der Drag-and-Drop-Events
function dragDropInit ()
{
    document.onmousemove = drag;
    document.onmouseup = drop;
} // Ende dragDropInit


// aufgerufen, wenn ein Objekt bewegt werden soll
function dragStart (pobj_dragObj)
{
    if (k_spielende == 0)
    {
        this.obj_dragObj = pobj_dragObj;
        var obj_figur = getFigurById(obj_dragObj.getAttribute("id"));

        if (k_farbeAmZug(obj_figur))
        {
            // aktiviertes Objekt auf höchste Ebene setzen
            obj_dragObj.style.zIndex = 100;

            // Pixelkoordinaten der Position berechnen, an der das Objekt angeklickt wurde, relativ zum übergeordneten Objekt
            int_dragObjKlickX = int_MausX - obj_dragObj.offsetLeft;
            int_dragObjKlickY = int_MausY - obj_dragObj.offsetTop;

            // Pixelkoordinaten der Mitte des angeklickten Objekts berechnen
            int_dragObjMitteX = findePos(obj_dragObj)[0] + 20;
            int_dragObjMitteY = findePos(obj_dragObj)[1] + 20;

            // Differenz in Pixelkoordinaten berechnen zwischen der Mausposition und der Mitte des angeklickten Objekts
            int_diffMausObjMitteX = int_MausX - int_dragObjMitteX;
            int_diffMausObjMitteY = int_MausY - int_dragObjMitteY;

            // Pixelkoordinaten der linken oberen Ecke des Schachbrettes berechnen
            int_brettX = findePos(document.getElementById("brett"))[0];
            int_brettY = findePos(document.getElementById("brett"))[1];

            //Mitte des angeklickten Objekts an Mauszeiger "snappen"
            obj_dragObj.style.left = (int_MausX - int_brettX + 2) + "px";
            obj_dragObj.style.top = (int_MausY - int_brettY + 5) + "px";
        }
        else
            // Objekt deaktivieren
            obj_dragObj = null;
    }
} // Ende dragStart


// aufgerufen, wenn die Maus bewegt wird (bewegt bei Bedarf das Objekt)
function drag (mausBewegung)
{
    // Pixelkoordinaten der Maus berechnen
    int_MausX = mausBewegung.pageX;
    int_MausY = mausBewegung.pageY;

    // falls nicht nur die Maus, sondern auch ein Objekt bewegt wird
    if (obj_dragObj != null)
    {
        // Differenz zwischen ursprünglicher Mitte des angeklickten Objekts und aktueller Mausposition in Pixel berechnen
        int_diffX = int_MausX - int_dragObjMitteX - int_diffMausObjMitteX;
        int_diffY = int_MausY - int_dragObjMitteY - int_diffMausObjMitteY;

        // falls sich die Maus außerhalb des Schachbretts befindet, werden die Hilfsvariablen auf true gesetzt
        if (int_MausX - 20 < int_brettX || int_MausX + 12 > int_brettX + 320)
            bol_rausX = true;
        else
            bol_rausX = false;
        if (int_MausY - 20 < int_brettY || int_MausY + 12 > int_brettY + 320)
            bol_rausY = true;
        else
            bol_rausY = false;

        // falls die Maus innerhalb des Schachbretts ist, wird die Objektposition neu berechnet
        if (bol_rausX == false)
            obj_dragObj.style.left = (int_MausX - int_dragObjKlickX + int_diffMausObjMitteX) + "px";
        if (bol_rausY == false)
            obj_dragObj.style.top = (int_MausY - int_dragObjKlickY + int_diffMausObjMitteY) + "px";
    }
} // Ende drag


// aufgerufen, wenn ein Objekt nicht mehr bewegt werden soll
function drop ()
{
    // falls nicht nur die Maus, sondern auch ein Objekt losgelassen wird
    if (obj_dragObj != null)
    {
        // Differenz zwischen Start- und Zielposition in Schachfeld-Koordinaten berechnen
        var int_diffFeldX = int_diffX / 40;
        var int_diffFeldY = int_diffY / 40;

        // jenes JavaScript-Figur-Objekt identifizieren, welches die ID des angeklickten Objekts aufweist
        var obj_figur = getFigurById(obj_dragObj.getAttribute("id"));

        // falls die Maus innerhalb des Sachbretts losgelassen wird
        if ((bol_rausX == false) && (bol_rausY == false))
        {
            // falls Zielposition nicht eindeutig gewählt, aktiviertes Objekt auf ursprüngliche Startposition zurücksetzen
            if ((Math.abs(int_diffFeldX - Math.round(int_diffFeldX)) > 0.4) || (Math.abs(int_diffFeldY - Math.round(int_diffFeldY)) > 0.4))
            {
                obj_dragObj.style.top = (348 - obj_figur.int_yPos * 40) + "px";
                obj_dragObj.style.left = (-14 + obj_figur.int_xPos * 40) + "px";
            }

            // ansonsten, falls Start- und Zielposition nicht identisch sind
            else if ((Math.round(int_diffFeldX) != 0) || (Math.round(int_diffFeldY) != 0))
            {
                    // Zielfeld in Schachfeld-Koordinaten berechnen
                    str_zielFeld = String(obj_figur.int_yPos - Math.round(int_diffFeldY)) + String(obj_figur.int_xPos + Math.round(int_diffFeldX));

                    // falls der Zug auf das Zielfeld gültig ist
                    if (obj_figur.zugPruefen(karr_felder[str_zielFeld]) == true)
                    {
                        // falls das Zielfeld leer ist
                        if (karr_felder[str_zielFeld].obj_figur == "")
                        {
                            // aktiviertes Objekt auf dessen Zielposition "snappen"
                            obj_dragObj.style.top = (348 - (obj_figur.int_yPos - Math.round(int_diffFeldY)) * 40) + "px";
                            obj_dragObj.style.left = (-14 + (obj_figur.int_xPos + Math.round(int_diffFeldX)) * 40) + "px";

                            // Zug an Historie übergeben
                            k_zugAnHistorie(karr_felder[obj_figur.int_feldIndex], karr_felder[str_zielFeld]);

                            // ID des Zielfelds identifizieren und der Methode ziehen() übergeben
                            k_zug(obj_figur, karr_felder[str_zielFeld]);

                            // textlichen Hinweis im HTML auf den aktuellen (= letzten) Zug ändern
                            if (karr_historie[karr_historie.length - 1] != null)
                                letzterZug(karr_historie[karr_historie.length - 1].replace(/;/g, ""));

                            // textlichen Hinweis im HTML auf das aktuelle Zugrecht ändern und korrekte CSS-Cursor setzen
                            zugrechtSwitch();
                        }
                        // ansonsten, falls keine befreundete Figur auf dem Zielfeld steht
                        else if (k_feindlich(obj_figur, karr_felder[str_zielFeld].obj_figur) == true)
                        {
                            // aktiviertes Objekt auf dessen Zielposition "snappen"
                            obj_dragObj.style.top = (348 - (obj_figur.int_yPos - Math.round(int_diffFeldY)) * 40) + "px";
                            obj_dragObj.style.left = (-14 + (obj_figur.int_xPos + Math.round(int_diffFeldX)) * 40) + "px";

                            // Zug an Historie übergeben
                            k_zugAnHistorie(karr_felder[obj_figur.int_feldIndex], karr_felder[str_zielFeld]);

                            // ID des Zielfelds identifizieren und der Methode ziehen() übergeben
                            k_zug(obj_figur, karr_felder[str_zielFeld]);

                            // textlichen Hinweis im HTML auf den aktuellen (= letzten) Zug ändern
                            if (karr_historie[karr_historie.length - 1] != null)
                            {
                                var str_uebergabe = karr_historie[karr_historie.length - 1].replace(/;/g, "");
                                letzterZug(str_uebergabe.replace(/\+/g, ""));
                            }

                            // textlichen Hinweis im HTML auf das aktuelle Zugrecht ändern und korrekte CSS-Cursor setzen
                            zugrechtSwitch();
                        }
                        // ansonsten aktiviertes Objekt auf dessen ursprüngliche Startposition zurücksetzen
                        else
                        {
                            obj_dragObj.style.top = (348 - obj_figur.int_yPos * 40) + "px";
                            obj_dragObj.style.left = (-14 + obj_figur.int_xPos * 40) + "px";
                        }
                    }

                    // ansonsten aktiviertes Objekt auf dessen ursprüngliche Startposition zurücksetzen
                    else
                    {
                        obj_dragObj.style.top = (348 - obj_figur.int_yPos * 40) + "px";
                        obj_dragObj.style.left = (-14 + obj_figur.int_xPos * 40) + "px";
                    }

            }
            // ansonsten aktiviertes Objekt auf dessen ursprüngliche Startposition zurücksetzen
            else
            {
                obj_dragObj.style.top = (348 - obj_figur.int_yPos * 40) + "px";
                obj_dragObj.style.left = (-14 + obj_figur.int_xPos * 40) + "px";
            }
        }
        // ansonsten aktiviertes Objekt auf dessen ursprüngliche Startposition zurücksetzen
        else
        {
            obj_dragObj.style.top = (348 - obj_figur.int_yPos * 40) + "px";
            obj_dragObj.style.left = (-14 + obj_figur.int_xPos * 40) + "px";
        }

        // aktiviertes Objekt auf ursprüngliche Ebene zurücksetzen
        obj_dragObj.style.zIndex = 0;

        // Objekt deaktivieren
        obj_dragObj = null;
    }
} // Ende drop
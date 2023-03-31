document.addEventListener("DOMContentLoaded", async () => {
   const url = "https://www.randyconnolly.com/funwebdev/3rd/api/colors/sample-colors.php";
   const loader = document.querySelector("#loader");
   let data = [];
   // Fetches the data from the specified url
   const getData = async () => {
      loader.style.display = "block";
      try{
         const res = await fetch(url);
         data = await res.json();
         loader.style.display = "none"; // Hide the loader after we retrieve the data successfully
      } catch(err){
         console.log(err);
      }
   }
   // Creates the color schema HTML
   const makeColorSchemes = async () => {
      await getData(); // Waits for the data request to complete
      console.log(data);
      if (data.length > 0){
      const container = document.querySelector(".scheme-group");
      data.forEach((cScheme) => {
         const schemeTitle = document.createElement("h3");
         schemeTitle.innerText = cScheme.title;
         container.appendChild(schemeTitle); // First child element
         // Color Scheme container
         const colorScheme = document.createElement("section");
         colorScheme.className = "scheme";
         // Preview container (color palette and)
         const preview = document.createElement("div");
         preview.className = "preview";
         const schemeColors = cScheme.scheme;
         // Create the button element
         const viewBtn = document.createElement("button");
         viewBtn.className = "actions";
         viewBtn.innerText = "View";
         viewBtn.id = cScheme.id;
         viewBtn.addEventListener('click', displayColorScheme); // Adding the event listener
         // Looping through the inner data to create the color scheme visual
         for (let i=0; i< schemeColors.length; i++){
            const colorBox = document.createElement("div");
            colorBox.style.backgroundColor = schemeColors[i].web; // Hex value
            colorBox.className = "color-box";
            preview.appendChild(colorBox);
         }
         colorScheme.append(preview, viewBtn);
         container.appendChild(colorScheme);
      })
      } else{
         console.log("No data to work with...")
      }
   }
   // Displays the selected color scheme
   const displayColorScheme = (e) => {
      // the id value of the button
      const valueId = Number(e.target.id);
      // find based off that
      const selectedScheme = data.find( (scheme) => scheme.id === valueId );
      const container = document.querySelector("aside");
      container.innerHTML = "";
      const schemeName = document.createElement("h2");
      const fieldset = document.createElement("fieldset");
      schemeName.innerText = selectedScheme.title;
      container.appendChild(schemeName);
      selectedScheme.scheme.forEach((color) => {
         const colorRow = document.createElement('div');
         colorRow.className = "colorRow";
         // Detail box styling and stuff
         const detailBox = document.createElement('detailBox');
         detailBox.style.backgroundColor = color.web;
         detailBox.className = "detailBox";
         // Span setup
         const hexValue = document.createElement("span");
         const rgbValue = document.createElement("span");
         const colorName = document.createElement("label");
         // Adding the values
         hexValue.innerText = color.web;
         rgbValue.innerText = `rgb(${color.color.red}, ${color.color.green}, ${color.color.blue})`;
         colorName.innerText = color.name;
         // Appending all to color row
         colorRow.append(detailBox, hexValue, rgbValue, colorName);
         fieldset.appendChild(colorRow);
      })
      container.appendChild(fieldset);
   }
   makeColorSchemes(); 
});


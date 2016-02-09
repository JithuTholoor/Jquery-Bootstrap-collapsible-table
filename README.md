# Jquery-Bootstrap-collapsible-table
A bootstrap JQuery plugin that helps to manage number of table columns visible in mobile divices. 
Usage : 
      $('#table_id').tableCollpase([<index of column that should visble in default>]);
      eg:
      <table class="table" id="myTable">
                <thead>
                    <tr>
                        <th>Firstname</th>
                        <th>Lastname</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>John</td>
                        <td>Doe</td>
                        <td>john@example.com</td>
                    </tr>
                    <tr>
                        <td>Mary</td>
                        <td>Moe</td>
                        <td>mary@example.com</td>
                    </tr>
                    <tr>
                        <td>July</td>
                        <td>Dooley</td>
                        <td>july@example.com</td>
                    </tr>
                </tbody>
    </table>
      
    <script>
    $('#myTable').tableCollpase([1, 2]);
    $(document).ready(function () {
        $('[data-toggle="popover"]').popover();
    });
    </script>

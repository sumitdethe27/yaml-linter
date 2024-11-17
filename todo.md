Architecture Changes:

Keep the current dual text box layout, but we'll need to modify how we display the YAMLs
Instead of plain textareas, we'll use a code editor component with syntax highlighting
We'll use CodeMirror or Monaco Editor for better YAML visualization and line highlighting
The comparison will happen in real-time while preserving the current YAML structure


Frontend Changes:

Replace current textareas with code editor components
Add line-by-line highlighting capability
Need to modify the CSS to support line highlighting
Add visual indicators for changes (red/green)


Backend Changes:

Modify the comparison logic to return line-specific differences
Include line numbers in the difference output
Return a structured response that includes:

Changed lines with their numbers
Type of change (addition, deletion, modification)
Original and new values
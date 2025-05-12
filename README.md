Sub UpdateColumns()
    On Error GoTo ErrorHandler
    Application.ScreenUpdating = False
    Application.Calculation = xlCalculationManual
    
    Dim lastRow As Long, lastCol As Integer
    Dim i As Long, j As Integer, groupCols As Integer
    Dim rng As Range
    Dim processedGroups As Integer  ' 新增处理组计数器
    
    groupCols = 12
    processedGroups = 0
    lastRow = Cells(Rows.Count, 1).End(xlUp).Row
    lastCol = Cells(1, Columns.Count).End(xlToLeft).Column
    
    For j = 2 To lastCol Step groupCols
        processedGroups = processedGroups + 1  ' 计数每组处理
        
        ' 动态列边界检查（防止溢出）
        If j + 11 > Columns.Count Then Exit For
        
        ' 设置列标题
        With Cells(1, j + 10)
            .Value = "中位数"
            .HorizontalAlignment = xlCenter
        End With
        With Cells(1, j + 11)
            .Value = "标准差"
            .HorizontalAlignment = xlCenter
        End With
        
        For i = 2 To lastRow
            ' 动态计算可用列数
            Dim validCols As Integer
            validCols = Application.Min(9, lastCol - j)
            
            Set rng = Range(Cells(i, j), Cells(i, j + validCols))
            
            ' 计算中位数
            With Cells(i, j + 10)
                If .Value = "" Then
                    .Value = Application.Median(rng)
                End If
            End With
            
            ' 计算标准差
            With Cells(i, j + 11)
                If .Value = "" Then
                    If Application.Count(rng) > 1 Then
                        .Value = Application.StDev_S(rng)
                        .NumberFormat = "0.00"
                    Else
                        .Value = "N/A"
                    End If
                End If
            End With
        Next i
    Next j
    
    Columns.AutoFit
    
    ' 成功提示（新增部分）
    MsgBox "数据更新完成！" & vbCrLf & _
           "成功处理 " & processedGroups & " 个数据组" & vbCrLf & _
           "最后行号：" & lastRow & "  总列数：" & lastCol, _
           vbInformation + vbOKOnly, _
           "操作报告"
    
    Application.ScreenUpdating = True
    Application.Calculation = xlCalculationAutomatic
    Exit Sub

ErrorHandler:
    MsgBox "操作在以下位置中断：" & vbCrLf & _
           "数据组：" & processedGroups + 1 & "  当前行：" & i & vbCrLf & _
           "错误描述：" & Err.Description, _
           vbCritical, _
           "错误报告"
    Application.ScreenUpdating = True
    Application.Calculation = xlCalculationAutomatic
End Sub

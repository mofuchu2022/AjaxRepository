import subprocess
import time
import re

def get_screen_resolution():
    """获取设备屏幕分辨率"""
    result = subprocess.run(
        ['adb', 'shell', 'wm', 'size'],
        capture_output=True,
        text=True
    )
    match = re.search(r'Physical size: (\d+)x(\d+)', result.stdout)
    if not match:
        raise RuntimeError("无法获取屏幕分辨率，请检查设备连接和ADB权限")
    return int(match.group(1)), int(match.group(2))  # 返回宽度, 高度

def check_lockscreen():
    """检测是否处于锁屏状态"""
    result = subprocess.run(
        ['adb', 'shell', 'dumpsys', 'window', 'policy'],
        capture_output=True,
        text=True
    )
    return 'mShowingLockscreen=true' in result.stdout

def main(save_path='./screenshot.png'):
    # 步骤1：获取屏幕参数
    try:
        screen_width, screen_height = get_screen_resolution()
        print(f"检测到屏幕分辨率：{screen_width}x{screen_height}")
    except Exception as e:
        print(f"错误：{str(e)}")
        return

    # 步骤2：检测锁屏状态
    if check_lockscreen():
        print("检测到锁屏，正在唤醒屏幕...")
        subprocess.run(['adb', 'shell', 'input', 'keyevent', '26'])  # 模拟电源键
        time.sleep(1.5)  # 等待解锁动画

    # 步骤3：计算滑动坐标（适配不同分辨率）
    start_x = screen_width // 2
    start_y = 200  # 距离顶部安全距离
    end_x = screen_width // 2
    end_y = screen_height - 200  # 距离底部安全距离（避开导航栏）

    print(f"执行滑动操作：从({start_x},{start_y})到({end_x},{end_y})")
    subprocess.run([
        'adb', 'shell', 'input', 'swipe',
        str(start_x),
        str(start_y),
        str(end_x),
        str(end_y),
        '500'  # 滑动持续时间（毫秒）
    ])
    time.sleep(0.5)  # 等待滑动完成

    # 步骤4：截图并保存
    print("正在截图并保存...")
    with open(save_path, 'wb') as f:
        subprocess.run(['adb', 'exec-out', 'screencap', '-p'], stdout=f)
    print(f"截图已保存至：{save_path}")

if __name__ == '__main__':
    # 使用示例（修改为你的保存路径）：
    main(save_path='C:/Users/YourName/Desktop/full_screen_capture.png')

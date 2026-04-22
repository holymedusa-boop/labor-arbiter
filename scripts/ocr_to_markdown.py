#!/usr/bin/env python3
"""
产品详情页图片转Markdown工具
支持批量OCR识别中文/英文内容并输出为Markdown格式

安装依赖:
pip install paddleocr pillow tqdm

使用方法:
1. 将PDP.zip放在同一目录
2. 运行: python ocr_to_markdown.py
3. 结果输出到 output/ 目录
"""

import zipfile
import os
from pathlib import Path
from PIL import Image
from paddleocr import PaddleOCR
import json
from tqdm import tqdm
import re

# 初始化OCR（中文+英文）
ocr = PaddleOCR(use_angle_cls=True, lang='ch', show_log=False)

def extract_zip(zip_path, extract_to="./temp_images"):
    """解压zip文件"""
    print(f"正在解压 {zip_path}...")
    with zipfile.ZipFile(zip_path, 'r') as zip_ref:
        zip_ref.extractall(extract_to)
    print(f"解压完成，文件保存在 {extract_to}")
    return extract_to

def process_image(image_path, ocr_engine):
    """单张图片OCR识别"""
    try:
        result = ocr_engine.ocr(str(image_path), cls=True)
        
        # 提取文本
        texts = []
        for line in result[0]:
            if line:
                text = line[1][0]  # 获取识别出的文本
                confidence = line[1][1]  # 置信度
                if confidence > 0.8:  # 只保留置信度>80%的文本
                    texts.append(text)
        
        return "\n".join(texts)
    except Exception as e:
        return f"[OCR Error: {str(e)}]"

def clean_filename(filename):
    """清理文件名用于Markdown标题"""
    # 移除扩展名
    name = Path(filename).stem
    # 替换特殊字符
    name = re.sub(r'[_\-]+', ' ', name)
    return name.strip()

def create_markdown(image_dir, output_dir="./output"):
    """批量处理并生成Markdown"""
    Path(output_dir).mkdir(exist_ok=True)
    
    # 支持的图片格式
    image_extensions = {'.jpg', '.jpeg', '.png', '.bmp', '.webp'}
    
    # 获取所有图片文件
    image_files = []
    for ext in image_extensions:
        image_files.extend(Path(image_dir).rglob(f"*{ext}"))
    
    print(f"找到 {len(image_files)} 张图片，开始OCR识别...")
    
    # 汇总Markdown
    summary_md = ["# 产品详情页内容汇总\n\n", "| 文件名 | 链接 |\n", "|--------|------|\n"]
    
    for img_path in tqdm(image_files, desc="处理进度"):
        relative_path = img_path.relative_to(image_dir)
        file_stem = clean_filename(img_path.name)
        
        # OCR识别
        content = process_image(img_path, ocr)
        
        # 生成单个Markdown文件
        md_content = f"""# {file_stem}

**原始文件**: `{relative_path}`

## 识别内容

{content}

---
*自动识别生成 - 置信度阈值: 80%*
"""
        
        # 保存单个文件
        output_file = Path(output_dir) / f"{img_path.stem}.md"
        output_file.write_text(md_content, encoding='utf-8')
        
        # 添加到汇总
        summary_md.append(f"| {file_stem} | [{img_path.name}](./{img_path.stem}.md) |\n")
    
    # 保存汇总文件
    summary_path = Path(output_dir) / "README.md"
    summary_path.write_text("".join(summary_md), encoding='utf-8')
    
    print(f"\n✅ 处理完成！")
    print(f"- 单个文件: {output_dir}/")
    print(f"- 汇总索引: {output_dir}/README.md")
    print(f"- 总计处理: {len(image_files)} 张图片")

def main():
    zip_file = "PDP.zip"  # 修改为你的文件名
    
    if not os.path.exists(zip_file):
        print(f"错误: 找不到文件 {zip_file}")
        print("请将PDP.zip放在脚本同目录，或修改zip_file变量")
        return
    
    # 解压
    temp_dir = extract_zip(zip_file)
    
    # 处理并生成Markdown
    create_markdown(temp_dir)
    
    # 可选: 清理临时文件
    # import shutil
    # shutil.rmtree(temp_dir)
    # print(f"已清理临时文件: {temp_dir}")

if __name__ == "__main__":
    main()

using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class v : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "kategori",
                table: "Yemekler");

            migrationBuilder.AddColumn<int>(
                name: "kategoriId",
                table: "Yemekler",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "id",
                keyValue: 1,
                column: "password",
                value: "67wV50PZvF9FNnoQ8IMyDGtWsIk7iiZnau4mM7/fS0Pjl8b1");

            migrationBuilder.CreateIndex(
                name: "IX_Yemekler_kategoriId",
                table: "Yemekler",
                column: "kategoriId");

            migrationBuilder.AddForeignKey(
                name: "FK_Yemekler_Kategoriler_kategoriId",
                table: "Yemekler",
                column: "kategoriId",
                principalTable: "Kategoriler",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Yemekler_Kategoriler_kategoriId",
                table: "Yemekler");

            migrationBuilder.DropIndex(
                name: "IX_Yemekler_kategoriId",
                table: "Yemekler");

            migrationBuilder.DropColumn(
                name: "kategoriId",
                table: "Yemekler");

            migrationBuilder.AddColumn<string>(
                name: "kategori",
                table: "Yemekler",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "id",
                keyValue: 1,
                column: "password",
                value: "4J8zNEBrMVWp1qZJlqnRvk/Y7UokPHMiPP8hEYCVZ+oM6/SS");
        }
    }
}

using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class f : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Siparisler_users_userId",
                table: "Siparisler");

            migrationBuilder.DropPrimaryKey(
                name: "PK_users",
                table: "users");

            migrationBuilder.RenameTable(
                name: "users",
                newName: "Users");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Users",
                table: "Users",
                column: "id");

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "id", "email", "password", "refreshToken", "refreshTokenExpiryTime", "role", "token" },
                values: new object[] { 1, "admin@admin.com", "4J8zNEBrMVWp1qZJlqnRvk/Y7UokPHMiPP8hEYCVZ+oM6/SS", null, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Admin", null });

            migrationBuilder.AddForeignKey(
                name: "FK_Siparisler_Users_userId",
                table: "Siparisler",
                column: "userId",
                principalTable: "Users",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Siparisler_Users_userId",
                table: "Siparisler");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Users",
                table: "Users");

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "id",
                keyValue: 1);

            migrationBuilder.RenameTable(
                name: "Users",
                newName: "users");

            migrationBuilder.AddPrimaryKey(
                name: "PK_users",
                table: "users",
                column: "id");

            migrationBuilder.AddForeignKey(
                name: "FK_Siparisler_users_userId",
                table: "Siparisler",
                column: "userId",
                principalTable: "users",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
